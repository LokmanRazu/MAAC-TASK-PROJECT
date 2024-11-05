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

export class CommentResponseDto{

    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    body: string;

    @ApiProperty()
    @Expose()
    user: CommentUser

}