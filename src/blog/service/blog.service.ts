import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { plainToInstance } from "class-transformer";
import { Blog } from "../entity/blog.entity";
import { BlogResponseDto } from "../dto/response/blog-response.dtp";
import { BlogRequestDto, UpdateBlogRequestDto } from "../dto/request/blog-request.dto";
import { User } from "src/user/entity/user.entity";
import { BlogTagMappedService } from "./blogTagMapped.service";
import { TagService } from "./tag.service";
import { AddBlogTag } from "../dto/request/add-mapped-tag.dto";

@Injectable()
export class BlogService {


    constructor(@InjectModel(Blog) private blogModel: typeof Blog, private tagMappedService: BlogTagMappedService, private tagService: TagService) {
    }

    async deleteBlogTag(id: number, tagId: number, userId: number) {
        let blog = await this.blogModel.findOne({ where: { id, userId: userId }, raw: true });
        if (!blog) {
            throw new NotFoundException()
        }
    
        await this.tagMappedService.deleteMapTag(blog.id, tagId)
        return "Ok"
    }

    async addBlogTag(blogId: number, dto: AddBlogTag, userId: number) {
        let blog = await this.blogModel.findOne({ where: { id: blogId, userId: userId }, raw: true });
        if (!blog) {
            throw new NotFoundException()
        }
        await this.tagMappedService.addBlogTag(blog.id, dto.tagId)
        return "Ok"
    }

    async findAll(userId: number): Promise<BlogResponseDto[]> {

        let blogs = await this.blogModel.findAll({
            where: {
                userId: userId
            }
        });
        let blogIds = blogs.map(blog => blog.id)
        let mappedTags = await this.tagMappedService.findAllByBlogIds(blogIds)
        let tags = [];
        if (mappedTags.length > 0) {
            let tagIds = mappedTags.map(mapTag => mapTag.tagId);
            tags = await this.tagService.findByIds(tagIds)
        }

        blogs.forEach(blog => {
            let assignMappedTagIds = mappedTags.filter(mapTag => mapTag.blogId === blog.id);
            console.log("assignTagIds", assignMappedTagIds)
            let assignTags = [];
            assignMappedTagIds.forEach(mappedTag => {
                let tag = tags.find(tag => tag.id == mappedTag.tagId);
                assignTags.push(tag)
            })
            console.log("assignTags=======", assignTags)
            blog['tags'] = assignTags
        })
        console.log("blogs======", blogs)
        return plainToInstance(BlogResponseDto, blogs, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    async findOne(id: number, userId): Promise<BlogResponseDto> {
        let blog = await this.blogModel.findOne({ where: { id, userId: userId }, raw: true });
        let mappedTags = await this.tagMappedService.findAllByBlogId(blog.id);
        let tags = []

        if (mappedTags.length > 0) {
            let tagIds = mappedTags.map(mapTag => mapTag.tagId)
            tags = await this.tagService.findByIds(tagIds)
        }
        console.log("tags===", tags)
        return plainToInstance(BlogResponseDto, { ...blog, tags }, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    async create(dto: BlogRequestDto, userId: number): Promise<BlogResponseDto> {
        let { title, body, tagIds } = dto;
        let blog = await this.blogModel.create({
            title,
            body,
            userId
        });

        if (tagIds.length > 0) {
            let payload = [];

            tagIds.forEach(id => {
                payload.push({
                    blogId: blog.id,
                    tagId: +id
                })
            })
            await this.tagMappedService.create(payload)
        }

        return plainToInstance(BlogResponseDto, blog, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    async update(id: number, dto: UpdateBlogRequestDto, userId: any): Promise<String> {

        let blog = await this.blogModel.findOne({ where: { id, userId: userId } })
        if (!blog) {
            throw new NotFoundException()
        }

        await this.blogModel.update({ ...blog, ...dto }, {
            where: {
                id
            }
        })
        return "Ok"

    };

    async delete(id: number, userId: number): Promise<String> {
        let blog = await this.blogModel.findOne({ where: { id, userId: userId } })
        if (!blog) {
            throw new NotFoundException()
        }

        await this.blogModel.destroy({
            where: {
                id: blog.id
            }
        })
        return "OK"
    };

}