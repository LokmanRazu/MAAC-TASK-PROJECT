import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "./entity/user.entity";
import { UserController } from "./controller/user.controller";
import { UserService } from "./service/user.service";
import { PassportModule } from "@nestjs/passport";

@Module({
    imports:[
        PassportModule.register({defaultStrategy:'jwt'}),
        SequelizeModule.forFeature([User]),
    ],
    controllers:[UserController],
    providers:[UserService],
    exports:[UserService]
})
export class UserModule{};