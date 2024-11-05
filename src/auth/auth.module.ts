import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./controller/auth.controller";
import { AuthService } from "./service/auth.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "src/user/entity/user.entity";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { JwtAuthGuard } from "./jwt.auth-guard";
import { UserModule } from "src/user/user.module";

@Module({
    imports:[
      
        SequelizeModule.forFeature([User]),
        PassportModule.register({defaultStrategy:'jwt'}), 
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<any>('JWT_SECRET'),
                signOptions: { expiresIn: '50m' }
        }),
        inject: [ConfigService]
    }),
    UserModule
        
    ],
    controllers:[AuthController],
    providers:[AuthService,JwtStrategy,JwtAuthGuard],
    exports:[]
})
export class AuthModule{

}
