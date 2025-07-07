import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserRequestDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string;
    
    @ApiProperty({ enum: ['user', 'admin'] })
    @IsNotEmpty()
    @IsIn(['user', 'admin'])
    role: 'user' | 'admin';


}

export class UserUpdateRequestDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

}

