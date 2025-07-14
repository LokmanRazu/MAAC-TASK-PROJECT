import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from 'mongoose';
import { plainToInstance } from "class-transformer";
import { Comment, CommentDocument } from "src/schemas/comment.schema";
import { CommentResponseDto } from "../dto/response/comment-response.dto";
import { CommentRequestDto } from "../dto/request/comment-request.dto";
import { BlogService } from "./blog.service";
import { UserService } from "src/user/service/user.service";
import { BlogDocument } from "src/schemas/blog.schema";
import { UserDocument } from "src/schemas/user.schema";

@Injectable()
export class CommentService {

    constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>, private blogService: BlogService, private userService: UserService) {
    }

    async create(dto: CommentRequestDto, blogId: string, userId: string): Promise<CommentResponseDto> {
        let { body } = dto;

        let blog = await this.blogService.findBlogById(blogId);
        if (!blog) {
            throw new NotFoundException()
        }

        let data = await this.commentModel.create({
            body,
            userId: new Types.ObjectId(userId),
            blogId: blog._id,

        });
        return plainToInstance(CommentResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };


    async deleteBlogComment(comment_id: string, blogId: string, userId: string): Promise<String> {
        let blog = await this.blogService.findBlogById(blogId);
        if (!blog) {
            throw new NotFoundException()
        }
        await this.commentModel.deleteOne({
            _id: new Types.ObjectId(comment_id),
            blogId: blog._id,
            userId: new Types.ObjectId(userId)
        }).exec()
        return "Delete Sucessfully"
    }

    async blogComments(blogId: string): Promise<CommentResponseDto[]> {
        let blog = await this.blogService.findBlogById(blogId);
        if (!blog) {
           return [];
        }

        let comments = await this.commentModel.find({
            blogId: new Types.ObjectId(blogId)
        }).exec()

        let userIds = comments.map(comment=> comment.userId.toString());
        let users = await this.userService.findUsersByIds(userIds) as UserDocument[];
        comments.forEach(comment=>{
            comment['user'] = users.find(user=> user._id.toString() == comment.userId.toString())
        })
       
        return plainToInstance(CommentResponseDto, comments,{
            excludeExtraneousValues:true,
            enableImplicitConversion:true
        })
    }

}