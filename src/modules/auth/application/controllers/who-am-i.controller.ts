import { Controller, Get, Request, Response, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from "../guards/jwt.guard";
import {CurrentUser} from "../decorators/user.decorator";
import {AuthService} from "../services/auth.service";

@Controller({
    path: '/auth/whoAmI',
    version: '1'
})
export class WhoAmIController {

    constructor(private readonly authService: AuthService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    public async whoAmI(@Request() req, @Response() res) {
        res.json(await this.authService.whoAmI(req.user))
    }
}
