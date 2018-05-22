import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';
import { Location } from '../model/Location.model';
import { LocationService } from '../service/Location.service';
import { SweetAlertService } from 'angular-sweetalert-service';

@Component({
    selector: 'location',
    templateUrl: './Location.component.html',
    styleUrls: ['./Location.component.css']
})
export class LocationComponent {

    private xLocationForm: FormGroup;
    private selectedID: any;

    private LocationSample: Location;
    
    constructor(private router: Router, private LocationService: LocationService,private m_xAlertService: SweetAlertService) {
        
        // create form
        this.xLocationForm = new FormGroup({
            locationName: new FormControl("", Validators.required),
            description: new FormControl(""),
            longitude: new FormControl("", Validators.required),
            lattitude: new FormControl("", Validators.required)
        });
    }

    ngOnInit() {

    }


    //--  edit : When user clicks on update button
    private createLocation(locationModel: any) {
      if (this.xLocationForm.valid) {
           
            //alert(JSON.stringify(locationModel));
            this.LocationService.create(locationModel)
                .subscribe(
                    data => {
                
                        if (true) {
                            this.m_xAlertService.success({
                                title: 'Location Created Successfully'
                              })

                            this.router.navigate(['/locationlist']);
                        }
                        // else{
                        //      this.m_xAlertService.error({
                        //            title: 'Location not Created'
                        //         })
                        // }

                    },
                    error => {
                        console.log(error);
                    });
        }
        else
            this.validateAllFormFields(this.xLocationForm)
     }
    //-- validate all fields
    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }

}
