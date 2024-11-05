import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Blog } from "./entity/blog.entity";
import { BlogController } from "./controller/blog.controller";
import { BlogService } from "./service/blog.service";
import { Comment } from "./entity/comment.entity";
import { CommentService } from "./service/comment.service";
import { Tag } from "./entity/tag.entity";
import { BlogTagMapped } from "./entity/blogTag-mapped.entity";
import { BlogTagMappedService } from "./service/blogTagMapped.service";
import { PassportModule } from "@nestjs/passport";
import { TagController } from "./controller/tag.controller";
import { TagService } from "./service/tag.service";
import { UserModule } from "src/user/user.module";


@Module({
    imports:[
        PassportModule.register({defaultStrategy:'jwt'}),
        SequelizeModule.forFeature([Blog,Comment,Tag,BlogTagMapped]),
        UserModule
    ],
    controllers:[BlogController,TagController],
    providers:[BlogService,CommentService,TagService,BlogTagMappedService],
    exports:[]
})
export class BlogModule{}