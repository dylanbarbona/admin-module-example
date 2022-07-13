import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Token {
    @Field({ description: 'Token' })
    token: string;
}
