import { Observable } from 'rxjs';
import { IStorageProvider } from './providers/istorageprovider';
import { LogService } from '../logging/log.service';

export class CvsService{
    private pdfFileName: string = 'CV/CV.pdf';
    private docxFileName: string = 'CV/CV.docx';

    constructor(private storageProvider: IStorageProvider, private log: LogService){

    }

    getCvPdfFileUrl(): Observable<string> {
        this.log.info("Getting " + this.pdfFileName);

        return this.storageProvider.getFileUrl(this.pdfFileName);
    }

    getCvDocxFileUrl(): Observable<string> {
        this.log.info("Getting " + this.docxFileName);

        return this.storageProvider.getFileUrl(this.docxFileName);
    }
}