import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";


export class BlogTagMappedResponseDto {
    @ApiProperty()
    @Expose()
    id: string;

    @ApiProperty()
    @Expose()
    blogId: string;

    @ApiProperty()
    @Expose()
    tagId: string;


}