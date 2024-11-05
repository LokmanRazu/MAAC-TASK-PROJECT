import { Body, Controller, Get, HttpStatus, Param, Post, Put, Delete, Patch } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { TagService } from "../service/tag.service";
import { TagResponseDto } from "../dto/response/tag-response.dto";
import { TagRequestDto } from "../dto/request/tag-request.dto";


@Controller({ path: 'tags' })
@ApiTags('Tag')
export class TagController {
    constructor(private tagService: TagService) { }

    @Get()
    @ApiOkResponse({ type: TagResponseDto })
    async findAll(): Promise<TagResponseDto[]> {
        return this.tagService.findAll()
    };


    @Post()
    @ApiOkResponse({ type: TagResponseDto })
    async save(@Body() dto: TagRequestDto): Promise<TagResponseDto> {
        return await this.tagService.create(dto);
    };

};