import { Column, HasMany, IsEmail, Model, Table, Unique } from "sequelize-typescript";
import { Blog } from "src/blog/entity/blog.entity";
import { Comment } from "src/blog/entity/comment.entity";

@Table
export class User extends Model<User>{
    @Column({
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @Column({
        allowNull:false 
    })
    name: string

    @Unique
    @IsEmail
    @Column({
        allowNull:false
    })
    email: string

    @Column({
        allowNull:false
    })
    password:string;

    @HasMany(()=> Blog)
    blogs:Blog[];

    @HasMany(()=> Comment)
    comment:Comment[];
};