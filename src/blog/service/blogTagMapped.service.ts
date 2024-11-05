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

    async findAll(): Promise<BlogTagMappedResponseDto[]> {
        let data = await this.blogTagMappedModel.findAll();
        return plainToInstance(BlogTagMappedResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    async findOne(id: number): Promise<BlogTagMappedResponseDto> {
        let data = await this.blogTagMappedModel.findOne({ where: { id }});
        return plainToInstance(BlogTagMappedResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    async creat(dto: BlogTagMappedRequestDto): Promise<BlogTagMappedResponseDto> {
        let { id, blogId,tagId} = dto;
        let data = await this.blogTagMappedModel.create({
            id,
            blogId,
            tagId
        });
        return plainToInstance(BlogTagMappedResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    async update(id: number, dto: BlogTagMappedRequestDto): Promise<BlogTagMappedResponseDto> {
        let user = await this.blogTagMappedModel.findByPk(id);
        let data = await user.update(dto);
        return plainToInstance(BlogTagMappedResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });

    };

    async delete(id: number): Promise<BlogTagMappedResponseDto> {
        let user = await this.blogTagMappedModel.findByPk(id);

        console.log("user        rr   "+user)
        let data = await user.destroy()
        return plainToInstance(BlogTagMappedResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        })

    };



}