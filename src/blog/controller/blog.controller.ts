import { Body, Controller, Get, HttpStatus, Param, Post, Put, Delete,Request, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { BlogService } from "../service/blog.service";
import { BlogResponseDto } from "../dto/response/blog-response.dtp";
import { BlogRequestDto, UpdateBlogRequestDto } from "../dto/request/blog-request.dto";
import { AuthGuard } from "@nestjs/passport";
import { AddBlogTag } from "../dto/request/add-mapped-tag.dto";
import { CommentResponseDto } from "../dto/response/comment-response.dto";
import { CommentRequestDto } from "../dto/request/comment-request.dto";
import { CommentService } from "../service/comment.service";

@ApiTags('Blog')
@ApiBearerAuth("JWT-auth")
@UseGuards(AuthGuard('jwt'))
@Controller({ path: 'blogs' })

export class BlogController {
    constructor(private blogService: BlogService, private commentService : CommentService) { }

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

    @Get('/:id/comments')
    @ApiOkResponse({ type: [CommentResponseDto] })
    async blogComments(@Param('id') id: number, @Request() req): Promise<CommentResponseDto[]> {
        return this.commentService.blogComments(id)
    };

    @Post()
    @ApiOkResponse({ type: BlogResponseDto })
    async save(@Body() dto: BlogRequestDto, @Request() req): Promise<BlogResponseDto> {
        return await this.blogService.create(dto,req.user.id);
    };


    @Put('/:id')
    @ApiOkResponse({ type: BlogResponseDto })
    async update(@Param('id') id: number, @Body() dto: UpdateBlogRequestDto,@Request() req): Promise<String> {
      
       await this.blogService.update(id, dto,req.user.id)
       return "Ok"
    };
    
    @Delete('/:id')
    @ApiOkResponse({ type: BlogResponseDto })
    async delete(@Param('id') id: number,@Request() req): Promise<String> {
    
        this.blogService.delete(id,req.user.id)
        return "Ok"
    };

    @Delete('/:id/delete-tag/:tag_id')
    @ApiOkResponse({ type: BlogResponseDto })
    async deleteTag(@Param('id') id: number,@Param('tag_id') tagId: number, @Request() req): Promise<String> {
    
        this.blogService.deleteBlogTag(id,tagId,req.user.id)
        return "Ok"
    };


    @Put('/:id/add-tag')
    @ApiOkResponse({ type: BlogResponseDto })
    async addNewTag(@Param('id') blogId: number, @Body() dto:AddBlogTag,  @Request() req): Promise<String> {
    
        this.blogService.addBlogTag(blogId,dto,req.user.id)
        return "Ok"
    };



    @Post(":id/comments")
    @ApiOkResponse({ type: CommentResponseDto })
    async createBlogComment(@Body() dto: CommentRequestDto, @Param('id') blogId: number, @Request() req): Promise<CommentResponseDto> {
        return await this.commentService.create(dto,blogId,req.user.id);
    };

    @Delete(":id/comments/:comment_id")
    @ApiOkResponse({ type: CommentResponseDto })
    async deleteBlogComment(@Param('comment_id') commentId: number, @Param('id') blogId: number, @Request() req): Promise<String> {
        return await this.commentService.deleteBlogComment(commentId,blogId,req.user.id);
    };



};