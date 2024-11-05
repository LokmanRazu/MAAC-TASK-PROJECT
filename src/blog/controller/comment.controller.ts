import { Body, Controller, Get, HttpStatus, Param, Post, Put, Delete,Request } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { CommentService } from "../service/comment.service";
import { CommentResponseDto } from "../dto/response/comment-response.dto";
import { CommentRequestDto } from "../dto/request/comment-request.dto";



@Controller({ path: 'comments' })
@ApiTags('Comment')
export class CommentController {
    constructor(private commentService: CommentService) { }

    @Get()
    @ApiOkResponse({ type: CommentResponseDto })
    async findAll(@Request() req): Promise<CommentResponseDto[]> {
        return this.commentService.findAll(req.user.id)
    };

    @Get('/:id')
    @ApiOkResponse({ type: CommentResponseDto })
    async find(id:number, @Request() req): Promise<CommentResponseDto> {
        return this.commentService.findOne(id,req.user.id)
    };

    @Post()
    @ApiOkResponse({ type: CommentResponseDto })
    async save(@Body() dto: CommentRequestDto): Promise<CommentResponseDto> {
        return await this.commentService.create(dto);
    };


    @Put('/:id')
    @ApiOkResponse({ type: CommentResponseDto })
    async update(@Param('id') id: number, @Body() dto: CommentRequestDto,@Request() req): Promise<CommentResponseDto> {
        return await this.commentService.update(id, dto,req.user.id);
    };

    @Delete('/:id')
    @ApiOkResponse({ type: CommentResponseDto })
    async delete(@Param('id') id: number,@Request() req): Promise<CommentResponseDto> {
        console.log(id)
        return this.commentService.delete(id,req.user.id)
    };


}