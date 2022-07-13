import { Resolver, Query, Args } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { LoginInput } from "../inputs/login.input";
import { Token } from "../../domain/entities/token.entity";
import { SkipThrottle } from "@nestjs/throttler";

@SkipThrottle()
@Resolver()
export class LoginResolver {
    constructor(private readonly authService: AuthService) {}

    @Query(() => Token, { name: 'mobileLogin' })
    public async login(@Args('loginInput') loginInput: LoginInput) {
        const token = await this.authService.login(loginInput);
        return { token }
    }
}
