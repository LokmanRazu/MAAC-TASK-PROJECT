import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CommentRequestDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    body: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    blogId: number;

}