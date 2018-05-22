import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';
import { Location } from '../model/Location.model';
import { LocationService } from '../service/Location.service'
import { SweetAlertService } from 'angular-sweetalert-service';
import { Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
@Component({
    selector: 'locationEdit',
    templateUrl: './LocationEdit.component.html',
   
})
export class LocationEditComponent implements OnInit {

    private xLocationForm: FormGroup;
    private selectedID: any;
    
    private LocationSample: Location;

    constructor(private route: ActivatedRoute, private router: Router,private LocationService: LocationService,private m_xAlertService: SweetAlertService) {
       
       // create form
        this.xLocationForm = new FormGroup({
            locationName: new FormControl("",Validators.required),
            description: new FormControl(""),
            longitude: new FormControl("", Validators.required),
            lattitude: new FormControl("", Validators.required)
        });
         
        //-- read by id 
        


    }

    ngOnInit() {
        this.route.params.subscribe(params => {
           
            this.selectedID = params['id'];
            this.getLocation(this.selectedID);
        });
        
    }


    // --  get record  from DB  on behalf of id 

    private getLocation(id: any) {

       this.LocationService.getById(id)
           .subscribe(
               data => {
                
                   if (true) {

                        this.xLocationForm.patchValue({
                            locationName:data.locationName,
                            description: data.description,
                            longitude: data.longitude,
                            lattitude: data.lattitude,
                        });
                   }
                    // if data receives succesfull then populate it on html controls.
                },
                error => {
                    console.log(error);
                });

    }

    //--  edit : When user clicks on update button 
    private updateLocation(locationModel: any) {
if(this.xLocationForm.valid)
{
    this.LocationService.update(locationModel, this.selectedID)
        .subscribe(
            data => {
               
                if (true) {
                    this.m_xAlertService.success({
                        title: 'Location Updated Successfully'
                      })
                    this.router.navigate(['/locationlist']);
                }
                else{
                   // this.m_xAlertService.error({
                   //     title: 'Location not  Updated'
                   //   })
                }

            },
            error => {
                console.log(error);
            });
}
else
   this.validateAllFormFields(this.xLocationForm)

       
    }
    // validate all form field
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
