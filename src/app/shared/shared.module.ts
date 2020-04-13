import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Imports for Angular Material Modules for UI Components
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

// Import for Layout CDK -- Component Development Kit
import { LayoutModule } from '@angular/cdk/layout';
import { ShellComponent } from './shell/shell.component';
import { RouterModule } from '@angular/router';
import { UserModule } from '../user/user.module';

const modules = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule,
  CommonModule,
  LayoutModule,
  RouterModule,
  MatDialogModule,
]


@NgModule({
  declarations: [ShellComponent],
  imports: [
    ...modules
  ],
  exports:[
    ShellComponent,
    ...modules
  ]
})
export class SharedModule { }
