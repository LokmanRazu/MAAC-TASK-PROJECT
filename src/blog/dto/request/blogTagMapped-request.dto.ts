import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class BlogTagMappedRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    blogId: string;

    @ApiProperty()
    @IsNotEmpty()
    tagId: string;


}