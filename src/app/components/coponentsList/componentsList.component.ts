import { Component, ViewChild, ChangeDetectorRef }             from '@angular/core';
import { FirestoreDbProvider}               from '../../services/database/providers/firestore.dbprovider';
import { ComponentsService }                from '../../services/database/components.servise';
import { LogService }                       from '../../services/logging/log.service';
import { AngularFirestore }                 from '@angular/fire/firestore';
import { Component as ComponentModel }      from '../../models/Component.model';
import { AuthService }                      from 'src/app/services/auth/auth.service';
import { MatTableDataSource }               from '@angular/material/table';
import { MatPaginator }                     from '@angular/material/paginator';
import { MatDialog }                        from '@angular/material/dialog';
import { DeleteDialogComponent }            from '../dialogs/removeDialog/deleteDialog.component';
import { AddNewComponentComponent } from '../dialogs/addNewComponent/addNewComponent.component';
import { EditComponentDialogComponent } from '../dialogs/editComponent/editComponentDialog.component';

@Component({
    selector: "components-list",
    templateUrl: "./componentsList.component.html",
    styleUrls: ['./componentsList.component.css'],
    providers: [ LogService ]
})
export class ComponentsListComponent{
    componentsService: ComponentsService;
    
    columnsToDisplay : string[] = ['name', 'cost', 'actions'];   
    components: MatTableDataSource<ComponentModel>;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        public auth: AuthService,
        fireStorage: AngularFirestore, 
        log: LogService,
        public dialog: MatDialog,
        private changeDetectorRefs: ChangeDetectorRef)
    {
        let storageProvider = new FirestoreDbProvider(fireStorage);
        this.componentsService = new ComponentsService(storageProvider, log);
    }   
    
    ngOnInit(): void {
        this.auth.user$.subscribe(user =>
        {
            this.componentsService.getComponentsList(user.uid).subscribe(components => 
            {
                this.components = new MatTableDataSource<ComponentModel>(components);
                this.components.paginator = this.paginator;
            })
        });        
    }

    openDeleteDialog(rowData) {
      const dialogRef = this.dialog.open(DeleteDialogComponent);
      dialogRef.afterClosed().subscribe(result => {
          if (result == "true"){
            this.deleteComponent(rowData.name);
        }});
    }

    openEditComponentDialog(rowData){
        const dialogRef = this.dialog.open(
            EditComponentDialogComponent,
            { data: rowData } )
        dialogRef.afterClosed().subscribe(result => {
            if (result !== undefined){
                this.editComponent(result);
            }

            this.auth.user$.subscribe(user =>
            {
                this.componentsService.getComponentsList(user.uid).subscribe(components => 
                {
                    this.components = new MatTableDataSource<ComponentModel>(components);
                    this.components.paginator = this.paginator;
                })
            });        
        });
    }

    editComponent(component){
        this.componentsService.updateComponent(component);        
    }

    deleteComponent(componentName: string){
        this.auth.user$.subscribe(user =>
        {
            this.componentsService.deleteComponent(componentName, user.uid);
        });        
    }

    openAddNewComponentDialog(){
        this.dialog.open(AddNewComponentComponent);
    }
}