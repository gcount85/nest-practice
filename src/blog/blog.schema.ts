import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogDocument = Blog & Document; // Document 타입이면서 Blog 타입인 BlogDocument 타입

@Schema() // 몽구스 스키마로 모델을 쉽게 만들도록 nestjs가 제공하는 데코레이터
export class Blog {
  @Prop() // 모델의 프로퍼티
  id: string;
  @Prop()
  title: string;
  @Prop()
  content: string;
  @Prop()
  name: string;
  @Prop()
  createdDt?: Date; // nullable
  @Prop()
  updatedDt?: Date; // nullable
}

export const BlogSchema = SchemaFactory.createForClass(Blog); // 스키마 생성 (내부적으로 mongoose의 new Schema 사용)
