
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LocationComponent } from '../Location/Location.component';
import { LocationListComponent } from '../Location/LocationList.component';
import { LocationEditComponent } from '../Location/LocationEdit.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'locationlist', pathMatch: 'full' },
     { path: 'location', component: LocationComponent },
     { path: 'locationlist', component: LocationListComponent },
    //  { path: 'locationedit', component:  LocationEditComponent},
     { path: 'locationedit/:id', component:  LocationEditComponent},
    
    ])
  ],
  declarations: [],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
