import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,  ReactiveFormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http'; 
import { AppComponent } from './app.component';

import { StarterHeaderComponent } from './starter/starter-header/starter-header.component';
import { StarterLeftSideComponent } from './starter/starter-left-side/starter-left-side.component';
import { StarterContentComponent } from './starter/starter-content/starter-content.component';
import { StarterFooterComponent } from './starter/starter-footer/starter-footer.component';
import { StarterControlSidebarComponent } from './starter/starter-control-sidebar/starter-control-sidebar.component';
import { LocationComponent } from './Location/Location.component';
import { LocationListComponent } from './Location/LocationList.component';
import { LocationEditComponent } from './Location/LocationEdit.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ActionButtonComponent } from './Location/actionButton.component';
import { SweetAlertService } from 'angular-sweetalert-service';
import {LocationService} from './service/Location.service'

@NgModule({
  declarations: [
    AppComponent,

    StarterHeaderComponent,
    StarterLeftSideComponent,
    StarterContentComponent,
    StarterFooterComponent,
    StarterControlSidebarComponent,
    LocationComponent,
    LocationListComponent,
    LocationEditComponent,
    ActionButtonComponent
  ],
  entryComponents: [ActionButtonComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
     ReactiveFormsModule,
     HttpModule,
     HttpClientModule,
     Ng2SmartTableModule
  ],
  providers: [
    LocationService,SweetAlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
