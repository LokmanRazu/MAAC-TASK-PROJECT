import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { plainToInstance } from "class-transformer";
import { User } from "src/user/entity/user.entity";
import { Comment } from "../entity/comment.entity";
import { CommentResponseDto } from "../dto/response/comment-response.dto";
import { CommentRequestDto } from "../dto/request/comment-request.dto";
import { Blog } from "../entity/blog.entity";
import { BlogService } from "./blog.service";
import { UserService } from "src/user/service/user.service";

@Injectable()
export class CommentService {

    constructor(@InjectModel(Comment) private commentModel: typeof Comment, private blogService: BlogService, private userService: UserService) {
    }

    async create(dto: CommentRequestDto, blogId: number, userId: number): Promise<CommentResponseDto> {
        let { body } = dto;

        let blog = await this.blogService.findBlogById(blogId);
        if (!blog) {
            throw new NotFoundException()
        }

        let data = await this.commentModel.create({
            body,
            userId,
            blogId,

        });
        return plainToInstance(CommentResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };


    async deleteBlogComment(comment_id: any, blogId: number, userId: number): Promise<String> {
        let blog = await this.blogService.findBlogById(blogId);
        if (!blog) {
            throw new NotFoundException()
        }
        await this.commentModel.destroy({
            where: {
                id: comment_id,
                blogId: blog.id,
                userId: userId
            }
        })
        return "Ok"
    }

    async blogComments(blogId: number): Promise<CommentResponseDto[]> {
        let blog = await this.blogService.findBlogById(blogId);
        if (!blog) {
           return [];
        }

        let comments = await this.commentModel.findAll({
            where:{
                blogId: blogId
            },
            raw: true
        })

        let userIds = comments.map(comment=> comment.userId);
        let users = await this.userService.findUsersByIds(userIds);
        comments.forEach(comment=>{
            comment['user'] = users.find(user=> user.id == comment.userId)
        })
       
        return plainToInstance(CommentResponseDto, comments,{
            excludeExtraneousValues:true,
            enableImplicitConversion:true
        })
    }

}