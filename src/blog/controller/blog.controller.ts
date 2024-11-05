import { Body, Controller, Get, HttpStatus, Param, Post, Put, Delete,Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { BlogService } from "../service/blog.service";
import { BlogResponseDto } from "../dto/response/blog-response.dtp";
import { BlogRequestDto } from "../dto/request/blog-request.dto";
import { AuthGuard } from "@nestjs/passport";

@ApiTags('Blog')
@ApiBearerAuth("JWT-auth")
@UseGuards(AuthGuard('jwt'))
@Controller({ path: 'blogs' })

export class BlogController {
    constructor(private blogService: BlogService) { }

    @Get()
    @ApiOkResponse({ type: BlogResponseDto })
    async findAll( @Request() req): Promise<BlogResponseDto[]> {
        return this.blogService.findAll(req.user.id)
    };

    @Get('/:id')
    @ApiOkResponse({ type: BlogResponseDto })
    async find(@Param('id') id: number, @Request() req): Promise<BlogResponseDto> {
        return this.blogService.findOne(id,req.user.id)
    };

    @Post()
    @ApiOkResponse({ type: BlogResponseDto })
    async save(@Body() dto: BlogRequestDto): Promise<BlogResponseDto> {
        return await this.blogService.create(dto);
    };


    @Put('/:id')
    @ApiOkResponse({ type: BlogResponseDto })
    async update(@Param('id') id: number, @Body() dto: BlogRequestDto,@Request() req): Promise<BlogResponseDto> {
        const userId = req.user.id
        return await this.blogService.update(id, dto,userId);
    };
    
    @UseGuards(AuthGuard('jwt'))
    @Delete('/:id')
    @ApiOkResponse({ type: BlogResponseDto })
    async delete(@Param('id') id: number,@Request() req): Promise<BlogResponseDto> {
        const userId = req.user.id
        return this.blogService.delete(id,userId)
    };

};