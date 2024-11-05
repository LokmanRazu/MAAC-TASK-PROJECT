import { Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Blog } from "./blog.entity";
import { Tag } from "./tag.entity";


@Table
export class BlogTagMapped extends Model<BlogTagMapped>{
    @Column({
        primaryKey: true,
        autoIncrement: true
    })
    id: number;


    @ForeignKey(() => Blog)
    @Column
    blogId: number;

    @ForeignKey(() => Tag)
    @Column
    tagId: number;
    
};