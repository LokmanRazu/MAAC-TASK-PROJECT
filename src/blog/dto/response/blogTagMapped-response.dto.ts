import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";


export class BlogTagMappedResponseDto {
    @ApiProperty()
    @Expose()
    id: number;
g;
    @ApiProperty()
    @Expose()
    blogId: number;

    @ApiProperty()
    @Expose()
    tagId: number;


}