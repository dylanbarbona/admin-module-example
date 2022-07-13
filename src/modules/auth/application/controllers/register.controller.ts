import { Body, Controller, Post, Response } from '@nestjs/common';
import { Throttle } from "@nestjs/throttler";

import { AuthService } from "../services/auth.service";
import { RegisterInput } from "../inputs/register.input";

@Controller({
    path: '/auth/register',
    version: '1'
})
export class RegisterController {
    constructor(private readonly authService: AuthService) {}

    @Throttle(6, 60)
    @Post()
    public async register(@Body() registerInput: RegisterInput, @Response() res){
        const { name, email, password } = registerInput
        const token = await this.authService.register({ name, email, password })
        return res.send({ token })
    }
}
