import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from 'mongoose';
import { plainToInstance } from "class-transformer";
import { BlogTagMapped, BlogTagMappedDocument } from "src/schemas/blogTag-mapped.schema";
import { BlogTagMappedResponseDto } from "../dto/response/blogTagMapped-response.dto";
import { BlogTagMappedRequestDto } from "../dto/request/blogTagMapped-request.dto";


@Injectable()
export class BlogTagMappedService {


    constructor(@InjectModel(BlogTagMapped.name) private blogTagMappedModel: Model<BlogTagMappedDocument>) {
    }

    async addBlogTag(id: string, tagId: string) {
        let alredyHas = await this.blogTagMappedModel.findOne({
            blogId: new Types.ObjectId(id),
            tagId: new Types.ObjectId(tagId)
        }).exec();
        if (!alredyHas) {
            await this.blogTagMappedModel.create({
                tagId: new Types.ObjectId(tagId),
                blogId: new Types.ObjectId(id)
            });
        }
        return "Ok"
    }
    async deleteMapTag(blogId: string, tagId: string) {
        await this.blogTagMappedModel.deleteOne({
            blogId: new Types.ObjectId(blogId),
            _id: new Types.ObjectId(tagId)
        }).exec();
    }

    async findAllByBlogId(blogId: string): Promise<BlogTagMappedResponseDto[]> {
        let data = await this.blogTagMappedModel.find({
            blogId: new Types.ObjectId(blogId)
        }).exec();
        return plainToInstance(BlogTagMappedResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    async findAllByBlogIds(blogIds: string[]): Promise<BlogTagMappedResponseDto[]> {
        let data = await this.blogTagMappedModel.find({
            blogId: { $in: blogIds.map(id => new Types.ObjectId(id)) }
        }).exec();
        return plainToInstance(BlogTagMappedResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    async findOne(id: string): Promise<BlogTagMappedResponseDto> {
        let data = await this.blogTagMappedModel.findById(id).exec();
        return plainToInstance(BlogTagMappedResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    async create(dto: any[]): Promise<BlogTagMappedResponseDto[]> {
        let data = await this.blogTagMappedModel.insertMany(dto);
        return plainToInstance(BlogTagMappedResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

}