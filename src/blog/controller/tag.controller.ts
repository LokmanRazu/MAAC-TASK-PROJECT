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

    @Get('/:id')
    @ApiOkResponse({ type: TagResponseDto })
    async find(@Param('id') id: number): Promise<TagResponseDto> {
        console.log(id)
        return this.tagService.findOne(id)
    };

    @Post()
    @ApiOkResponse({ type: TagResponseDto })
    async save(@Body() dto: TagRequestDto): Promise<TagResponseDto> {
        return await this.tagService.creat(dto);
    };


    @Put('/:id')
    @ApiOkResponse({ type: TagResponseDto })
    async update(@Param('id') id: number, @Body() dto: TagRequestDto): Promise<TagResponseDto> {
        return await this.tagService.update(id, dto);
    };

    @Delete('/:id')
    @ApiOkResponse({ type: TagResponseDto })
    async delete(@Param('id') id: number): Promise<TagResponseDto> {
        console.log(id)
        return this.tagService.delete(id)
    };

};