import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Blog } from "./entity/blog.entity";
import { BlogController } from "./controller/blog.controller";
import { BlogService } from "./service/blog.service";
import { Comment } from "./entity/comment.entity";
import { CommentController } from "./controller/comment.controller";
import { CommentService } from "./service/comment.service";
import { Tag } from "./entity/tag.entity";
import { BlogTagMapped } from "./entity/blogTag-mapped.entity";
import { BlogTagMappedController } from "./controller/blogTagMapped.controller";
import { BlogTagMappedService } from "./service/blogTagMapped.service";
import { PassportModule } from "@nestjs/passport";
import { TagController } from "./controller/tag.controller";
import { TagService } from "./service/tag.service";


@Module({
    imports:[
        PassportModule.register({defaultStrategy:'jwt'}),
        SequelizeModule.forFeature([Blog,Comment,Tag,BlogTagMapped])
    ],
    controllers:[BlogController,CommentController,TagController,BlogTagMappedController],
    providers:[BlogService,CommentService,TagService,BlogTagMappedService],
    exports:[]
})
export class BlogModule{}