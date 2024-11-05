import { Body, Controller } from "@nestjs/common";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { AuthService } from "../service/auth.service";
import {Get,Post}  from "@nestjs/common";
import { LoginResponseDto } from "../dto/response/login-response.dto";
import { LoginRequestDto } from "../dto/request/login-request.dto";
import { UserResponseDto } from "src/user/dto/response/user-response.dto";
import { UserRequestDto } from "src/user/dto/request/user-request.dto";

@Controller({path:'auth'})
@ApiTags('Auth')
export class AuthController{
    constructor(private authService:AuthService){}
    // @Get()
    // @ApiSecurity("JWT-auth")
    // @UseGuards(AuthGuard())
    @Post("signin")
    @ApiOkResponse({ type: LoginResponseDto })
    async createUser(@Body() data: LoginRequestDto):Promise<LoginResponseDto>{
        return this.authService.login(data)
    }

    @Post("signup")
    @ApiOkResponse({ type: String })
    async save(@Body() dto: UserRequestDto): Promise<String> {
       await this.authService.signup(dto)
       return "OK"
    };
}