import {
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, take } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterseptorService implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user.pipe(
            take(1),
            exhaustMap((user) => {
                if (!user || !user.token) {
                    return next.handle(req);
                }

                const modifiedRequest = req.clone({
                    headers: new HttpHeaders().set(
                        'Authorization',
                        `Bearer ${user.token}`
                    ),
                });
                return next.handle(modifiedRequest);
            })
        );
    }
}
