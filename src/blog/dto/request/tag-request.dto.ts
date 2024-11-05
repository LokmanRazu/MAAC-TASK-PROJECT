import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty,  IsString } from "class-validator";

export class TagRequestDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;


}