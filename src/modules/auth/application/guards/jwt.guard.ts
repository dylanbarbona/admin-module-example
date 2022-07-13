import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {getI18nContextFromRequest, I18n, I18nContext} from "nestjs-i18n";
import {Observable} from "rxjs";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

    handleRequest(err: any, user: any) {
        if (err || !user)
            throw err || new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        return user;
    }
}
