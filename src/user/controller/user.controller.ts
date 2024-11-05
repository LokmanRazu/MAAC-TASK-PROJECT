import { Body, Controller, Get, Put, UseGuards,Request } from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UserService } from "../service/user.service";
import { UserResponseDto } from "../dto/response/user-response.dto";
import { UserRequestDto } from "../dto/request/user-request.dto";
import { AuthGuard } from "@nestjs/passport";
@ApiTags('User')
@ApiBearerAuth("JWT-auth")
@Controller({ path: 'users' })
export class UserController {
    constructor(private userService: UserService) { }


    @Get('me') 
    @UseGuards(AuthGuard('jwt'))
    @ApiOkResponse({ type: UserResponseDto })
    async find(@Request() req): Promise<UserResponseDto> { 

       return this.userService.findOne(req.user.id)
    };


    @Put('update-profile')
    @ApiOkResponse({ type: UserResponseDto })
    async update(@Request() req, @Body() dto: UserRequestDto): Promise<UserResponseDto> {
        return await this.userService.update(req.user.id, dto);
    };

}