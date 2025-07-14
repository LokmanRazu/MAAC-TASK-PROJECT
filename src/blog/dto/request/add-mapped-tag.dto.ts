import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AddBlogTag {
    @ApiProperty()
    @IsNotEmpty()
    tagId: string;
}