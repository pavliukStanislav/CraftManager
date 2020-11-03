import { Injectable } from '@angular/core';

@Injectable()
export class LogService {
    info(message: string){
        console.log('Info: ' + message);
    }

    error(message: string){
        console.error('ERROR: ' + message);
    }

    warning(message: string){
        console.warn('WARN: ' + message);
    }
}