import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "./login.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private login: LoginService) {

    }


    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

        //add the jwt token(localstorage) request
        let authReq = req;
        const tokenvalue = this.login.getToken();
        console.log("inside interceptor")
        if (tokenvalue!= null) { 
            authReq = authReq.clone(
        { setHeaders: {Authorization:`Bearer ${tokenvalue}`},
         });
        }
        return next.handle(authReq);
    }

}
export const AuthInterceptorProviders =[


    { 
        provide:HTTP_INTERCEPTORS,
        useClass:AuthInterceptor,
        multi:true,
    },
];