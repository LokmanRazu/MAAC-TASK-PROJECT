import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { plainToInstance } from "class-transformer";
import { Tag, TagDocument } from "src/schemas/tag.schema";
import { TagResponseDto } from "../dto/response/tag-response.dto";
import { TagRequestDto } from "../dto/request/tag-request.dto";


@Injectable()
export class TagService {
  
    constructor(@InjectModel(Tag.name) private tagModel: Model<TagDocument>) {
    }

    async findAll(): Promise<TagResponseDto[]> {
        let data = await this.tagModel.find().exec();
        return plainToInstance(TagResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    findByIds(tagIds: string[]):Promise<TagDocument[]> {
        
       return this.tagModel.find({
        _id: { $in: tagIds }
       }).exec()
    }

    async findOne(id: string): Promise<TagResponseDto> {
        let data = await this.tagModel.findById(id).exec();
        return plainToInstance(TagResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    async create(dto: TagRequestDto): Promise<TagResponseDto> {
        let { name} = dto;
        let data = await this.tagModel.create({
            name
        });
        return plainToInstance(TagResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    async update(id: string, dto: TagRequestDto): Promise<TagResponseDto> {
        let data = await this.tagModel.findByIdAndUpdate(id, dto, { new: true }).exec();
        return plainToInstance(TagResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });

    };

    async delete(id: string): Promise<TagResponseDto> {
        let data = await this.tagModel.findByIdAndDelete(id).exec();
        return plainToInstance(TagResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        })

    };



}