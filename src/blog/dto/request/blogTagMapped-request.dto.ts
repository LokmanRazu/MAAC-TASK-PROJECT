import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty,  IsNumber } from "class-validator";

export class BlogTagMappedRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    blogId: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    tagId: number;


}