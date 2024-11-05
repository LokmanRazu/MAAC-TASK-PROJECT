import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { plainToInstance } from "class-transformer";
import { User } from "src/user/entity/user.entity";
import { Comment } from "../entity/comment.entity";
import { CommentResponseDto } from "../dto/response/comment-response.dto";
import { CommentRequestDto } from "../dto/request/comment-request.dto";
import { Blog } from "../entity/blog.entity";

@Injectable()
export class CommentService {
    constructor(@InjectModel(Comment) private commentModel: typeof Comment) {
    }

    async findAll(userId: number): Promise<CommentResponseDto[]> {
        let data = await this.commentModel.findAll({
            where:{
                userId: userId
            }
        });
        return plainToInstance(CommentResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    async findOne(id: number,userId): Promise<CommentResponseDto> {
        let data = await this.commentModel.findOne({ where:{id,userId:userId} });
        return plainToInstance(CommentResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    async create(dto: CommentRequestDto): Promise<CommentResponseDto> {
        let {  body, userId,blogId } = dto;
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

    async update(id: number, dto: CommentRequestDto,userId:any): Promise<CommentResponseDto> {

        let blog = await this.commentModel.findOne({ where: { id,userId: userId } })
        if (!blog) {
            throw new NotFoundException()
        }

        let user = await this.commentModel.findByPk(id);
        let data = await user.update(dto);
        return plainToInstance(CommentResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });

    };

    async delete(id: number, userId: number): Promise<CommentResponseDto> {
        let blog = await this.commentModel.findOne({ where: { id,userId: userId } })
        if (!blog) {
            throw new NotFoundException()
        }

        let user = await this.commentModel.findByPk(id);

        let data = await user.destroy()
        return plainToInstance(CommentResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        })

    };

}