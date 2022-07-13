import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { Token } from "../../domain/entities/token.entity";
import { RegisterInput } from "../inputs/register.input";
import { SkipThrottle } from "@nestjs/throttler";

@SkipThrottle()
@Resolver()
export class RegisterResolver {
    constructor(private readonly authService: AuthService) {}

    @Mutation(() => Token, { name: 'mobileRegister' })
    public async register(@Args('registerInput') registerInput: RegisterInput) {
        const token = await this.authService.register(registerInput);
        return { token }
    }
}
