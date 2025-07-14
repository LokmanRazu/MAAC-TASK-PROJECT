import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";
import { UserResponseDto } from "src/user/dto/response/user-response.dto";


export class Tag {
    @ApiProperty()
    @Expose()
    id: string;

    @ApiProperty()
    @Expose()
    name: string;
}

export class BlogResponseDto {
    @ApiProperty()
    @Expose()
    id: string;

    @ApiProperty()
    @Expose()
    title: string;

    @ApiProperty()
    @Expose()
    body: string;

    @ApiProperty()
    @Expose()
    userId: string;

    @ApiProperty({ type: UserResponseDto })
    @Expose()
    user: UserResponseDto;

    @ApiProperty({ type: [Tag] })
    @Expose()
    @Transform(({ obj }) => obj.tags || [])
    tags: Tag[]

}