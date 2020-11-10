import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
	
import { MatToolbarModule }     from '@angular/material/toolbar';
import { MatIconModule }        from '@angular/material/icon';
import { MatButtonModule }      from '@angular/material/button';
import { MatMenuModule }        from '@angular/material/menu';
import { MatDividerModule }     from '@angular/material/divider';
import { MatListModule}         from '@angular/material/list';
import { MatFormFieldModule}    from '@angular/material/form-field';
import { MatInputModule }       from '@angular/material/input';
import { MatCardModule }        from '@angular/material/card';
import { MatExpansionModule }   from '@angular/material/expansion';
import { MatTreeModule }        from "@angular/material/tree";
import { MatSnackBarModule }    from "@angular/material/snack-bar";
import { MatTableModule }       from "@angular/material/table";

@NgModule({
    imports: [
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatDividerModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        CommonModule,
        MatExpansionModule,
        MatTreeModule,
        MatSnackBarModule,
        MatTableModule
    ],
    exports: [
        MatToolbarModule,
        MatIconModule,        
        MatButtonModule,
        MatMenuModule,
        MatDividerModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatExpansionModule,
        MatTreeModule,
        MatSnackBarModule,
        MatTableModule
    ],
    declarations: []
})

export class MaterialModule {}