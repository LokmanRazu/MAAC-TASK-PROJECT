import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/user/entity/user.entity";
import { LoginRequestDto } from "../dto/request/login-request.dto";
import { comparePassword } from "src/common/utils/utils";
import { UserService } from "src/user/service/user.service";
import { UserRequestDto } from "src/user/dto/request/user-request.dto";

@Injectable()
export class AuthService{

  
    constructor(private readonly jwtService:JwtService, private userService: UserService){}
  async  signup(dto: UserRequestDto) {
        await this.userService.creat(dto);
        
    }

    async login(dto:LoginRequestDto):Promise<{accessToken :string}>{
        let user = await this.userService.findOneByEmail(dto.email)
        if(!user){
            throw new UnauthorizedException('Invalid email or Password')
        }
        let match = await comparePassword(user.password,dto.password)
        if (!match) {
            throw new UnauthorizedException('Invalid email or Password')
        }
        const payload ={
            sub:user.id,
            name:user.name
        }
        console.log("payload++++++++++++", payload)
        return {
            accessToken:await this.jwtService.signAsync(payload)
        }
    }
}