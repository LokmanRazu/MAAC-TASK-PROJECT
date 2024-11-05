import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";


export class CommentResponseDto {
    @ApiProperty()
    @ApiProperty()
    @Expose()
    body: string;

    @ApiProperty()
    @Expose()
    userId: string;

    @ApiProperty()
    @Expose()
    blogId: number;

}