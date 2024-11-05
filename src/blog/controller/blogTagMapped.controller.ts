import { Body, Controller, Get, HttpStatus, Param, Post, Put, Delete, Patch } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { BlogTagMappedService } from "../service/blogTagMapped.service";
import { BlogTagMappedResponseDto } from "../dto/response/blogTagMapped-response.dto";
import { BlogTagMappedRequestDto } from "../dto/request/blogTagMapped-request.dto";



@Controller({ path: 'blogTagMapped' })
@ApiTags('BlogTagMapped')
export class BlogTagMappedController {
    constructor(private blogTagMappedService: BlogTagMappedService) { }

    @Get()
    @ApiOkResponse({ type: BlogTagMappedResponseDto })
    async findAll(): Promise<BlogTagMappedResponseDto[]> {
        return this.blogTagMappedService.findAll()
    };

    @Get('/:id')
    @ApiOkResponse({ type: BlogTagMappedResponseDto })
    async find(@Param('id') id: number): Promise<BlogTagMappedResponseDto> {
        console.log(id)
        return this.blogTagMappedService.findOne(id)
    };

    @Post()
    @ApiOkResponse({ type: BlogTagMappedResponseDto })
    async save(@Body() dto: BlogTagMappedRequestDto): Promise<BlogTagMappedResponseDto> {
        return await this.blogTagMappedService.creat(dto);
    };


    @Put('/:id')
    @ApiOkResponse({ type: BlogTagMappedResponseDto })
    async update(@Param('id') id: number, @Body() dto: BlogTagMappedRequestDto): Promise<BlogTagMappedResponseDto> {
        return await this.blogTagMappedService.update(id, dto);
    };

    @Delete('/:id')
    @ApiOkResponse({ type: BlogTagMappedResponseDto })
    async delete(@Param('id') id: number): Promise<BlogTagMappedResponseDto> {
        console.log(id)
        return this.blogTagMappedService.delete(id)
    };

};