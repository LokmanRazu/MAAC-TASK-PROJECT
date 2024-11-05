import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { plainToInstance } from "class-transformer";
import { Tag } from "../entity/tag.entity";
import { TagResponseDto } from "../dto/response/tag-response.dto";
import { TagRequestDto } from "../dto/request/tag-request.dto";


@Injectable()
export class TagService {
    constructor(@InjectModel(Tag) private tagModel: typeof Tag) {
    }

    async findAll(): Promise<TagResponseDto[]> {
        let data = await this.tagModel.findAll();
        return plainToInstance(TagResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    async findOne(id: number): Promise<TagResponseDto> {
        let data = await this.tagModel.findOne({ where: { id }});
        return plainToInstance(TagResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    async creat(dto: TagRequestDto): Promise<TagResponseDto> {
        let { id, body} = dto;
        let data = await this.tagModel.create({
            id,
            body,

        });
        return plainToInstance(TagResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    async update(id: number, dto: TagRequestDto): Promise<TagResponseDto> {
        let user = await this.tagModel.findByPk(id);
        let data = await user.update(dto);
        return plainToInstance(TagResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });

    };

    async delete(id: number): Promise<TagResponseDto> {
        let user = await this.tagModel.findByPk(id);

        console.log("user        rr   "+user)
        let data = await user.destroy()
        return plainToInstance(TagResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        })

    };



}