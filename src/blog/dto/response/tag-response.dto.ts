import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";


export class TagResponseDto {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    body: string;



}