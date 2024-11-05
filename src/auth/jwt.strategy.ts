import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectModel } from "@nestjs/sequelize";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Model } from "sequelize";
import { User } from "src/user/entity/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(@InjectModel(User) private userModel: typeof User){
    super({
        jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
        ignoreExpiration: false,
        secretOrKey:process.env.JWT_SECRET
    })
 }
    async validate(payload:any){
        console.log(payload + "   payloaadddd")
        const {sub} = payload
        const user = await this.userModel.findOne({where:{id:sub}}) 
        if(!user){ 
            throw new UnauthorizedException('Login First')
        }
        return user 
    }

}

