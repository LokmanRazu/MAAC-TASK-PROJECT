import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { BlogController } from "./controller/blog.controller";
import { BlogService } from "./service/blog.service";
import { CommentService } from "./service/comment.service";
import { BlogTagMappedService } from "./service/blogTagMapped.service";
import { TagController } from "./controller/tag.controller";
import { TagService } from "./service/tag.service";
import { UserModule } from "src/user/user.module";
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from 'src/schemas/blog.schema';
import { Comment, CommentSchema } from 'src/schemas/comment.schema';
import { Tag, TagSchema } from 'src/schemas/tag.schema';
import { BlogTagMapped, BlogTagMappedSchema } from 'src/schemas/blogTag-mapped.schema';

@Module({
    imports:[
        PassportModule.register({defaultStrategy:'jwt'}),
        MongooseModule.forFeature([
            { name: Blog.name, schema: BlogSchema },
            { name: Comment.name, schema: CommentSchema },
            { name: Tag.name, schema: TagSchema },
            { name: BlogTagMapped.name, schema: BlogTagMappedSchema },
        ]),
        UserModule
    ],
    controllers:[BlogController,TagController],
    providers:[BlogService,CommentService,TagService,BlogTagMappedService],
    exports:[]
})
export class BlogModule{};