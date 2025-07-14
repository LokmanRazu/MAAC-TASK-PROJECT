import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from 'mongoose';
import { plainToInstance } from "class-transformer";
import { Blog, BlogDocument } from "src/schemas/blog.schema";
import { BlogResponseDto } from "../dto/response/blog-response.dtp";
import { BlogRequestDto, UpdateBlogRequestDto } from "../dto/request/blog-request.dto";
import { User } from "src/schemas/user.schema"; // Assuming User schema is also in src/schemas
import { BlogTagMappedService } from "./blogTagMapped.service";
import { TagService } from "./tag.service";
import { AddBlogTag } from "../dto/request/add-mapped-tag.dto";

@Injectable()
export class BlogService {

    constructor(
        @InjectModel(Blog.name) private blogModel: Model<BlogDocument>,
        private tagMappedService: BlogTagMappedService,
        private tagService: TagService
    ) { }

    async deleteBlogTag(id: string, tagId: string, userId: string) {
        let blog = await this.blogModel.findOne({ _id: id, userId: new Types.ObjectId(userId) }).exec();
        if (!blog) {
            throw new NotFoundException()
        }

        await this.tagMappedService.deleteMapTag(blog._id.toString(), tagId)
        return "Delete Sucessfully"
    }

    async addBlogTag(blogId: string, dto: AddBlogTag, userId: string) {
        let blog = await this.blogModel.findOne({ _id: blogId, userId: new Types.ObjectId(userId) }).exec();
        if (!blog) {
            throw new NotFoundException()
        }
        await this.tagMappedService.addBlogTag(blog._id.toString(), dto.tagId)
        return "Ok"
    }

    async findAll(userId: string): Promise<BlogResponseDto[]> {
        console.log("Fetching blogs for userId:", userId);
        let blogs = await this.blogModel.find({ userId: new Types.ObjectId(userId) })
            .populate('userId') // Populate the user
            .exec();
        console.log("Fetched blogs:", blogs);

        // Manually populate tags since it's a many-to-many relationship via BlogTagMapped
        let blogIds = blogs.map(blog => blog._id.toString())
        console.log("Extracted blogIds:", blogIds);
        let mappedTags = await this.tagMappedService.findAllByBlogIds(blogIds)
        console.log("Fetched mappedTags:", mappedTags);
        let tags = [];
        if (mappedTags.length > 0) {
            let tagIds = mappedTags.map(mapTag => mapTag.tagId);
            console.log("Extracted tagIds from mappedTags:", tagIds);
            tags = await this.tagService.findByIds(tagIds)
            console.log("Fetched actual tags:", tags);
        }

        blogs.forEach(blog => {
            let assignMappedTagIds = mappedTags.filter(mapTag => mapTag.blogId.toString() === blog._id.toString());
            let assignTags = [];
            console.log(`Assigning tags for blog ${blog._id}:`, assignMappedTagIds);
            assignMappedTagIds.forEach(mappedTag => {
                let tag = tags.find(tag => tag._id.toString() == mappedTag.tagId);
                if (tag) {
                    assignTags.push(tag);
                }
            })
            blog['tags'] = assignTags;
            console.log(`Final tags for blog ${blog._id}:`, blog['tags']);
        })

        return plainToInstance(BlogResponseDto, blogs, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    async findOne(id: string, userId: string): Promise<BlogResponseDto> {
        let blog = await this.blogModel.findOne({ _id: id, userId: new Types.ObjectId(userId) })
            .populate('userId') // Populate the user
            .exec();
        if (!blog) {
            throw new NotFoundException()
        }
        let mappedTags = await this.tagMappedService.findAllByBlogId(blog._id.toString());
        let tags = []

        if (mappedTags.length > 0) {
            let tagIds = mappedTags.map(mapTag => mapTag.tagId)
            tags = await this.tagService.findByIds(tagIds)
        }
        return plainToInstance(BlogResponseDto, { ...blog.toObject(), tags }, { // .toObject() to convert Mongoose document to plain object
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    async findBlogByIdAndUserId(id: string, userId: string): Promise<BlogDocument> {
        let blog = await this.blogModel.findOne({ _id: id, userId: new Types.ObjectId(userId) }).exec();
        return blog
    };

    async findBlogById(id: string): Promise<BlogDocument> {
        let blog = await this.blogModel.findById(id).exec();
        return blog
    };

    async create(dto: BlogRequestDto, userId: string): Promise<BlogResponseDto> {
        let { title, body, tagIds } = dto;
        let blog = await this.blogModel.create({
            title,
            body,
            userId: new Types.ObjectId(userId)
        });

        if (tagIds.length > 0) {
            let payload = [];

            tagIds.forEach(id => {
                payload.push({
                    blogId: blog._id,
                    tagId: new Types.ObjectId(id)
                })
            })
            await this.tagMappedService.create(payload)
        }

        return plainToInstance(BlogResponseDto, blog.toObject(), { // .toObject() to convert Mongoose document to plain object
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    async update(id: string, dto: UpdateBlogRequestDto, userId: string): Promise<String> {

        let blog = await this.blogModel.findOne({ _id: id, userId: new Types.ObjectId(userId) }).exec();
        if (!blog) {
            throw new NotFoundException()
        }

        await this.blogModel.findByIdAndUpdate(id, dto, { new: true }).exec();
        return "Update Sucessfull"

    };

    async delete(id: string, userId: string): Promise<String> {
        if (!Types.ObjectId.isValid(id)) {
            throw new NotFoundException('Invalid Blog ID format');
        }
        let blog = await this.blogModel.findOne({ _id: id, userId: new Types.ObjectId(userId) }).exec();
        if (!blog) {
            throw new NotFoundException()
        }

        await this.blogModel.findByIdAndDelete(blog._id).exec();
        return "Delete Sucessfully"
    };

}