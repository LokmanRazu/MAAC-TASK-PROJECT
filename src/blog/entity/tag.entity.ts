import { BelongsTo, BelongsToMany, Column, DataType, ForeignKey, IsEmail, Model, Table, Unique } from "sequelize-typescript";

import { Blog } from "./blog.entity";
import { BlogTagMapped } from "./blogTag-mapped.entity";

@Table
export class Tag extends Model<Tag>{
    @Column({
        primaryKey: true,
        autoIncrement: true
    })
    id: number;

    @Column({
        allowNull:false
    })
    body: string

    @BelongsToMany(()=> Blog, ()=> BlogTagMapped)
    blogs:Blog[]


}