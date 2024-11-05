import { BelongsTo, Column, DataType, ForeignKey, HasMany, IsEmail, Model, Table, Unique } from "sequelize-typescript";
import { Blog } from "src/blog/entity/blog.entity";
import { User } from "src/user/entity/user.entity";

@Table
export class Comment extends Model<Comment>{
    @Column({
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @Column({
        allowNull: false
    })
    body: string

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    userId: number
    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => Blog)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    blogId: number
    @BelongsTo(() => Blog) 
    blog: Blog;

};