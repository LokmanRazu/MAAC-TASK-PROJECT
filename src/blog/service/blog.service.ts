import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { plainToInstance } from "class-transformer";
import { Blog } from "../entity/blog.entity";
import { BlogResponseDto } from "../dto/response/blog-response.dtp";
import { BlogRequestDto } from "../dto/request/blog-request.dto";
import { User } from "src/user/entity/user.entity";

@Injectable()
export class BlogService {
    constructor(@InjectModel(Blog) private blogModel: typeof Blog) {
    }

    async findAll(userId: number): Promise<BlogResponseDto[]> {
        console.log("userid======",userId)
        let data = await this.blogModel.findAll({
            where:{
                userId: userId
            }
        });
        console.log("data=====-",data)
        return plainToInstance(BlogResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    async findOne(id: number,userId): Promise<BlogResponseDto> {
        let data = await this.blogModel.findOne({ where:{id,userId:userId} });
        return plainToInstance(BlogResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    async create(dto: BlogRequestDto): Promise<BlogResponseDto> {
        let {  title, body, userId,tags } = dto;
        let data = await this.blogModel.create({
            title,
            body,
            userId,
            tags
        });
        return plainToInstance(BlogResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    async update(id: number, dto: BlogRequestDto,userId:any): Promise<BlogResponseDto> {

        let blog = await this.blogModel.findOne({ where: { id,userId: userId } })
        if (!blog) {
            throw new NotFoundException()
        }

        let user = await this.blogModel.findByPk(id);
        let data = await user.update(dto);
        return plainToInstance(BlogResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });

    };

    async delete(id: number, userId: number): Promise<BlogResponseDto> {
        let blog = await this.blogModel.findOne({ where: { id,userId: userId } })
        if (!blog) {
            throw new NotFoundException()
        }

        let user = await this.blogModel.findByPk(id);

        let data = await user.destroy()
        return plainToInstance(BlogResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        })

    };

}