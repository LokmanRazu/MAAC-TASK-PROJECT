import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Blog } from './blog.schema';
import { Tag } from './tag.schema';

export type BlogTagMappedDocument = BlogTagMapped & Document;

@Schema()
export class BlogTagMapped {
  @Prop({ type: Types.ObjectId, ref: 'Blog', required: true })
  blogId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Tag', required: true })
  tagId: Types.ObjectId;
}

export const BlogTagMappedSchema = SchemaFactory.createForClass(BlogTagMapped);
