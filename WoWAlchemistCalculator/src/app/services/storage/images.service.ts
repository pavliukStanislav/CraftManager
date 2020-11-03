import { Observable } from 'rxjs';
import { IStorageProvider } from './providers/istorageprovider';
import { LogService } from '../logging/log.service';

export class ImagesService{
    private mainPhotoFileName: string = 'Images/MainPhoto/photo.jpg';

    constructor(private storageProvider: IStorageProvider, private log: LogService){

    }

    getMainPhoto(): Observable<string | null> {
        this.log.info("Getting " + this.mainPhotoFileName);

        return this.storageProvider.getFileUrl(this.mainPhotoFileName);
    }
}