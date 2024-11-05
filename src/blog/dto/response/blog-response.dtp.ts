import { ApiProperty } from "@nestjs/swagger";
import { Expose, Transform } from "class-transformer";


export class Tag {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    name: string;
}

export class BlogResponseDto {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    title: string;

    @ApiProperty()
    @Expose()
    body: string;

    @ApiProperty()
    @Expose()
    userId: number;

    @ApiProperty()
    @Expose()
    @Transform(value=>value.obj?.tags??[])
    tags: Tag[]

}