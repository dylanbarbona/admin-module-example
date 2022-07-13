import { Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from "@nestjs/common";
import { User } from "../../domain/entities/user.entity";
import { GqlAuthGuard } from "../guards/graphql.guard";
import { CurrentUser } from '../decorators/user.decorator';
import { SkipThrottle } from "@nestjs/throttler";

@SkipThrottle()
@Resolver()
export class AuthResolver {

    @UseGuards(GqlAuthGuard)
    @Query(() => User, { name: 'mobileAuth' })
    public async whoAmI(@CurrentUser() user: User) {
        return user;
    }
}
