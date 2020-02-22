import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
//import 'rxjs/add/observable/throw';
//import 'rxjs/Observable';
import { LocalStorageService } from 'ngx-webstorage';
import { Injectable, Injector } from '@angular/core';
import { HttpError } from './HttpError';
import {Router} from "@angular/router";
import { tap, catchError } from "rxjs/operators";
//import {Toaster} from "nw-style-guide/toasts";
import { throwError } from 'rxjs';



@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private _injector: Injector){

    }

    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {
            const logFormat = 'background: maroon; color: white';

            return next.handle(req)
            .pipe(catchError(err => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 500) {
                      //  window.alert("Sorry, thre was a problem with your request - 500");
                        console.log('this should print your error!', err.message);
                    }

                    if (err.status === 403) {
                    //    window.alert("Sorry, thre was a problem with your request - 403");
                        console.log('this should print your error!', err.message);
                    }
                    //console.log('this should print your error! ' + err.status);
                }
                
                //return Observable.throw(err.statusText);
                return throwError(err.statusText);
 

                // .do(event => {
                // }, exception => {
                //     if (exception instanceof HttpErrorResponse) {
                //         switch (exception.status) {
        
                //             case HttpError.BadRequest:
                //                 console.error('%c Bad Request 400', logFormat);
                //                 break;
        
                //             case HttpError.Unauthorized:
                //                 console.error('%c Unauthorized 401', logFormat);
                //                 window.location.href = '/login' + window.location.hash;
                //                 break;
        
                //             case HttpError.NotFound:
                //                 //show error toast message
                //                 console.error('%c Not Found 404', logFormat);
                //                 //const _toaster = this._injector.get(Toaster),
                //                     _router = this._injector.get(Router);
                //                 // _toaster.show({
                //                 //     message: exception.error && exception.error.message ? exception.error.message :
                //                 //         exception.statusText,
                //                 //     typeId: 'error',
                //                 //     isDismissable: true
                //                 // });
                //                 _router.navigate(['']);
                //                 break;
        
                //             case HttpError.TimeOut:
                //                 // Handled in AnalyticsExceptionHandler
                //                 console.error('%c TimeOut 408', logFormat);
                //                 break;
        
                //             case HttpError.Forbidden:
                //                 console.error('%c Forbidden 403', logFormat);
                //                 //const _authService = this._injector.get(AuthorizationService);
                //                 //_authService.showForbiddenModal();
                //                 break;
        
                //             case HttpError.InternalServerError:
                //                 console.error('%c big bad 500', logFormat);
                //                 break;
                //         }
                //     }
                // });
        }));
    }

}
