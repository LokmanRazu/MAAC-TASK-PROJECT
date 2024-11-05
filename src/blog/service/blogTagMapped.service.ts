import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { plainToInstance } from "class-transformer";
import { BlogTagMapped } from "../entity/blogTag-mapped.entity";
import { BlogTagMappedResponseDto } from "../dto/response/blogTagMapped-response.dto";
import { BlogTagMappedRequestDto } from "../dto/request/blogTagMapped-request.dto";


@Injectable()
export class BlogTagMappedService {


    constructor(@InjectModel(BlogTagMapped) private blogTagMappedModel: typeof BlogTagMapped) {
    }

    async addBlogTag(id: number, tagId: number) {
        let alredyHas = await this.blogTagMappedModel.findOne({
            where: {
                blogId: id,
                tagId: tagId
            }
        })
        if (!alredyHas) {
            await this.blogTagMappedModel.create({
                tagId: tagId,
                blogId: id
            });
        }
        return "Ok"
    }
    async deleteMapTag(blogId: number, tagId: number) {
        await this.blogTagMappedModel.destroy({
            where: {
                blogId: blogId,
                id: tagId
            }
        })
    }

    async findAllByBlogId(blogId: number): Promise<BlogTagMappedResponseDto[]> {
        let data = await this.blogTagMappedModel.findAll({
            where: {
                blogId: blogId
            }
        });
        return plainToInstance(BlogTagMappedResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    async findAllByBlogIds(blogIds: number[]): Promise<BlogTagMappedResponseDto[]> {
        let data = await this.blogTagMappedModel.findAll({
            where: {
                blogId: blogIds
            },
            raw: true
        });
        return plainToInstance(BlogTagMappedResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    async findOne(id: number): Promise<BlogTagMappedResponseDto> {
        let data = await this.blogTagMappedModel.findOne({ where: { id } });
        return plainToInstance(BlogTagMappedResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    async create(dto: BlogTagMappedRequestDto[]): Promise<BlogTagMappedResponseDto[]> {
        let data = await this.blogTagMappedModel.bulkCreate(dto);
        return plainToInstance(BlogTagMappedResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

}