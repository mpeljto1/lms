import { ErrorHandler } from '@angular/core';
import {Router} from "@angular/router";

export default class MyErrorHandler implements ErrorHandler {

    constructor(private router:Router) {}    

    handleError(error) {
        this.router.navigate(['/error']);
        console.log(error);
    }
}