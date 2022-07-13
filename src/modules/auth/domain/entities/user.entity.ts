import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Exclude } from "class-transformer";

@ObjectType()
export class User {
  @Field(type => Int, { description: 'User ID' })
  id: number;

  @Field({ description: 'User name' })
  name?: string;

  @Field({  description: 'User email' })
  email: string;

  @Exclude()
  password?: string;
}
