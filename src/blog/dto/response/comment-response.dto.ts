import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";



export class CommentUser{
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    name: string;
}

export class CommentResponseDto {
    @ApiProperty()
    @ApiProperty()
    @Expose()
    body: string;


    @ApiProperty()
    @Expose()
    blogId: number;

    @ApiProperty()
    @Expose()
    id: number;

    
    @ApiProperty()
    @Expose()
    user: CommentUser

}