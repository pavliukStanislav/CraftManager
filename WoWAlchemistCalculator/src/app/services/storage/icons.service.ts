import { Observable } from 'rxjs';
import { IStorageProvider } from './providers/istorageprovider';
import { LogService } from '../logging/log.service';

export class IconsService{
    private facebookIcon: string = 'Icons/facebook.png';
    private instagramIcon: string = 'Icons/instagram.png';
    private linkedinIcon: string = 'Icons/linkedin.png';
    private twitterIcon: string = 'Icons/twitter.png'
    private youtubeIcon: string = 'Icons/youtube.png'

    constructor(private storageProvider: IStorageProvider, private log: LogService){}

    getFacebookIcon(): Observable<string | null> {
        this.log.info("Getting " + this.facebookIcon);

        return this.storageProvider.getFileUrl(this.facebookIcon);
    }

    getInstagramIcon(): Observable<string | null> {
        this.log.info("Getting " + this.instagramIcon);

        return this.storageProvider.getFileUrl(this.instagramIcon);
    }

    getLinkedinIcon(): Observable<string | null> {
        this.log.info("Getting " + this.linkedinIcon);

        return this.storageProvider.getFileUrl(this.linkedinIcon);
    }

    getTwitterIcon(): Observable<string | null> {
        this.log.info("Getting " + this.twitterIcon);

        return this.storageProvider.getFileUrl(this.twitterIcon);
    }

    getYoutubeIcon(): Observable<string | null> {
        this.log.info("Getting " + this.youtubeIcon);

        return this.storageProvider.getFileUrl(this.youtubeIcon);
    }
}