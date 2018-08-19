import { ErrorHandler, Injectable, Injector } from '@angular/core'
import { Router } from '@angular/router'
import { ConstHelperService } from './const-helper.service'

@Injectable()
export class AuthErrorHandler implements ErrorHandler {

    constructor(private injector: Injector, private constHelper: ConstHelperService) {

    }

    handleError(error) {
        const router = this.injector.get(Router)

        if (error !== undefined || error.rejection !== undefined || error.rejection.status === 401 || error.rejection.status === 403) {
            router.navigate([this.constHelper.SignInPageUrl])
        }

        throw error;
    }
}
