import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";


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

}