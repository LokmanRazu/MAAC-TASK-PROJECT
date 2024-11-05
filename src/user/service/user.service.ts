import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "../entity/user.entity";
import { UserResponseDto, UserResponseDtoWithPassword } from "../dto/response/user-response.dto";
import { UserRequestDto } from "../dto/request/user-request.dto";
import { hashPassword } from "src/common/utils/utils";
import { plainToInstance } from "class-transformer";

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userModel: typeof User) {
    }

    async findAll(): Promise<UserResponseDto[]> {
        let data = await this.userModel.findAll();
        return plainToInstance(UserResponseDto, data,{
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    async findOne(id: number): Promise<UserResponseDto> {
        let data = await this.userModel.findOne({ where: { id }, });
        return plainToInstance(UserResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    async findOneByEmail(email: string): Promise<UserResponseDtoWithPassword> {
        let data = await this.userModel.findOne({ where: { email }, });
        return plainToInstance(UserResponseDtoWithPassword, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    async creat(dto: UserRequestDto): Promise<UserResponseDto> {
        let {name, email, password } = dto;
        let data = await this.userModel.create({
            name,
            email,
            password: hashPassword(password)
        });
        return plainToInstance(UserResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    async update(id: number, dto: UserRequestDto): Promise<UserResponseDto> {
        let user = await this.userModel.findByPk(id);
        let data = await user.update(dto);
        return plainToInstance(UserResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });

    };

    async delete(id: number): Promise<UserResponseDto> {
        let user = await this.userModel.findByPk(id);

        console.log("user        rr   "+user)
        let data = await user.destroy()
        return plainToInstance(UserResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        })

    };



}