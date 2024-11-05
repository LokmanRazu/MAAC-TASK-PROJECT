import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class AddBlogTag {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    tagId: number;
}