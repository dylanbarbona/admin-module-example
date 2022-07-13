import { Body, Controller, Post, Response } from '@nestjs/common';
import { AuthService } from "../services/auth.service";
import { LoginInput } from "../inputs/login.input";

@Controller({
    path: '/auth/login',
    version: '1'
})
export class LoginController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    public async login(@Body() loginInput: LoginInput, @Response() res) {
        const { email, password } = loginInput
        const token = await this.authService.login({ email, password })
        return res.send({ token })
    }
}
