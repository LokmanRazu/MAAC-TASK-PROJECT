import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, HasMany, IsEmail, Model, Table, Unique } from "sequelize-typescript";
import { User } from "src/user/entity/user.entity";
import { Tag } from "./tag.entity";
import { BlogTagMapped } from "./blogTag-mapped.entity";
import { Comment } from "./comment.entity";

@Table
export class Blog extends Model<Blog>{
    @Column({
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @Column({
        allowNull:false
    })
    title: string


    @Column({
        allowNull:false
    })
    body: string

    @ForeignKey(()=>User)
    @Column({
        type:DataType.INTEGER,
        allowNull:false,
    })
    userId:number
    @BelongsTo(()=> User)
    user:User;

    @HasMany(()=>Comment,{onDelete: "CASCADE",onUpdate: "CASCADE",hooks:true})
    comments:Comment[]

    @BelongsToMany(()=> Tag, ()=> BlogTagMapped )
    tags:Tag[]

};