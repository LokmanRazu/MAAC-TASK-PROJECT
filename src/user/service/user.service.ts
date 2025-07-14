import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserResponseDto, UserResponseDtoWithPassword } from "../dto/response/user-response.dto";
import { UserRequestDto, UserUpdateRequestDto } from "../dto/request/user-request.dto";
import { hashPassword } from "src/common/utils/utils";
import { plainToInstance } from "class-transformer";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    }

    async findAll(): Promise<UserResponseDto[]> {
        let data = await this.userModel.find().exec();
        return plainToInstance(UserResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    async findUsersByIds(userIds: string[]): Promise<User[]> {
        let data = await this.userModel.find({ _id: { $in: userIds } }).exec();
        return data;
    };

    async findOne(id: string): Promise<UserResponseDto> {
        let data = await this.userModel.findById(id).exec();
        return plainToInstance(UserResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    async findOneByEmail(email: string): Promise<UserResponseDtoWithPassword> {
        let data = await this.userModel.findOne({ email }).exec();
        return plainToInstance(UserResponseDtoWithPassword, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    async creat(dto: UserRequestDto): Promise<UserResponseDto> {
        let { name, email, password ,role} = dto;
        let data = await this.userModel.create({
            name,
            email,
            password: hashPassword(password),
            role
        });
        return plainToInstance(UserResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });
    };

    async update(id: string, dto: UserUpdateRequestDto): Promise<UserResponseDto> {
        let data = await this.userModel.findByIdAndUpdate(id, dto, { new: true }).exec();
        return plainToInstance(UserResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        });

    };

    async delete(id: string): Promise<UserResponseDto> {
        let data = await this.userModel.findByIdAndDelete(id).exec();
        return plainToInstance(UserResponseDto, data, {
            enableImplicitConversion: true,
            excludeExtraneousValues: true
        })

    };

}