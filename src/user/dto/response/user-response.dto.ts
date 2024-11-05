import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";


export class UserResponseDto {
    @ApiProperty()
    @Expose()
    id: number;

    @ApiProperty()
    @Expose()
    name: string;

    @ApiProperty()
    @Expose()
    email: string;

}

export class UserResponseDtoWithPassword extends  UserResponseDto{
    @ApiProperty()
    @Expose()
    password: string;

}