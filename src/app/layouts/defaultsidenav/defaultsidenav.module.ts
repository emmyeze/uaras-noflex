import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AppRoutingModule } from 'src/app/app-routing.module';

import { DefaultsidenavComponent } from './defaultsidenav.component';


@NgModule({
  declarations: [
    DefaultsidenavComponent,
    // HomeComponent,
    // DashboardComponent,

  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    // FlexLayoutModule,
    SharedModule,
    // MatButtonModule,
    MatSidenavModule,
    // MatDividerModule, MatCardModule,
    // MatGridListModule, MatMenuModule,
  ]
})
export class DefaultsidenavModule { }
