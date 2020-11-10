import  { Component } from '@angular/core';
import { FirestoreDbProvider} from '../../services/database/providers/firestore.dbprovider';
import { ComponentsService } from '../../services/database/components.servise';
import { LogService } from '../../services/logging/log.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Component as ComponentModel } from '../../models/Component.model';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
    selector: "components-list",
    templateUrl: "./componentsList.component.html",
    styleUrls: ['./componentsList.component.css'],
    providers: [ LogService ]
})
export class ComponentsListComponent{
    componentsService: ComponentsService;
    private currentUserId: string;
    components: ComponentModel[]
    columnsToDisplay : string[] = ['name', 'cost'];

    constructor(
        public auth: AuthService,
        fireStorage: AngularFirestore, 
        log: LogService,
        ){
        let storageProvider = new FirestoreDbProvider(fireStorage);
        this.componentsService = new ComponentsService(storageProvider, log);
    }   
    
    ngOnInit(): void {
        this.auth.user$.subscribe(user =>
        {
            this.componentsService.getComponentsList(user.uid).subscribe(components => 
            {
                this.components = components;
            })
        });    
    }
}
