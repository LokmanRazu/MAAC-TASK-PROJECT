import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty,  IsString } from "class-validator";

export class TagRequestDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    body: string;


}