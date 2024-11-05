import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CommentRequestDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    body: string;

}