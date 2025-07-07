import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { User } from './user/entity/user.entity';
import { Blog } from './blog/entity/blog.entity';
import { BlogModule } from './blog/blog.module';
import { Comment } from './blog/entity/comment.entity';
import { Tag } from './blog/entity/tag.entity';
import { BlogTagMapped } from './blog/entity/blogTag-mapped.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal:true}), 
    SequelizeModule.forRoot({
      dialect:'mysql',
      host:process.env.DB_HOST,
      port:3306,
      username:process.env.DB_USERNAME,
      password:process.env.DB_PASSWORD,
      database:process.env.DB_DATABASE,
      models:[User,Blog,Comment,Tag,BlogTagMapped],
      autoLoadModels:true,
      synchronize:false

    }),
    UserModule,
    BlogModule,
    AuthModule
    

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
