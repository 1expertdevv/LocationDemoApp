import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, ParamMap, Route, Router } from '@angular/router';
import { Location } from '../model/Location.model';
import { LocationService } from '../service/Location.service'
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { ActionButtonComponent } from './actionButton.component';
import { SweetAlertService } from 'angular-sweetalert-service';

@Component({
    selector: 'locationlist',
    templateUrl: './LocationList.component.html',
    styleUrls: ['./LocationList.component.css']
})
export class LocationListComponent {

    Locationlist : any;
    source: LocalDataSource;
    xRecordCount: any;
    xStartPage: any;
    xEndPage: any;
    xRecord: any;
    xFilteredRecord: any;
    xNonFilteredRecord: any;
    constructor(private router: Router, private LocationService: LocationService,private m_xAlertService: SweetAlertService) {
        this.getAllLocations();
    }

// Smart  table settings
settings = {
    noDataMessage: "No data found",
    hideSubHeader: true,
    actions: { add: false, edit: false, delete: false },
    columns: {
        locationName: { title: 'Location', filter: false, sort: true },
        description: { title: 'Description', filter: false, sort: true },
        lattitude: { title: 'Latitude', filter: false, sort: true },
        longitude: { title: 'Longitude', filter: false, sort: true },
        button: {
            title: 'Action',
            type: 'custom',
            renderComponent: ActionButtonComponent,
            onComponentInitFunction: (instance: any) => {
                instance.xEnableActions = [{ actionType: 'Edit', enable: 'true' }, { actionType: 'Delete', enable: 'true' }];
                instance.id.subscribe(a_RowData => {
                   
                    //--call methods on behalf of actiontype
                    switch (a_RowData.ActionType) {
                        case "edit":
                             this.router.navigate(['/locationedit/' + a_RowData.rowData._id]);
                            //this.getUser(a_RowData.rowData);
                            break;
                        case "delete":
                            this.deletelocation(a_RowData.rowData._id);
                            break;
                        default:
                    }
                });
            },
            filter: false,
            sort: false,
        },
    },
    pager: {
        display: true,
        perPage: 5,
        perPageSelect: [5, 10, 20],
    },
    isPagerDisplay: true,
    perPageSelect: true,

};

//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
onRowSelect(event) {
    // set Starting Record number
    let xPagingEndPage = event.source.pagingConf.page * event.source.pagingConf.perPage;
    this.xStartPage = ((event.source.pagingConf.page * event.source.pagingConf.perPage) - (event.source.pagingConf.perPage - 1));
    this.xNonFilteredRecord = this.Locationlist.length;
    // compare filtered and nonfiltered record for setting total record
    this.xRecordCount = this.xFilteredRecord <= this.xNonFilteredRecord ? this.xFilteredRecord : this.xNonFilteredRecord;
    // compare maximum value of a page with total record count
    this.xEndPage = xPagingEndPage <= this.xRecordCount ? xPagingEndPage : this.xRecordCount;;
}
//---------------------------------------------------------------------------------------------
//---------------------------------------------------------------------------------------------
    private xLocationForm: FormGroup;
    // delete loaction 
    deletelocation(id: number) {
        this.m_xAlertService.confirm({
            title: 'Are you sure to delete location ?'
          })
          .then(() => 
          {
            this.LocationService.delete(id)
                .subscribe(
                    data => {
                        debugger;
                       
                            this.m_xAlertService.success({
                                title: 'Location Deleted Successfully'
                              })
                              this.getAllLocations();
                              this.router.navigate(['/locationlist']);

                    },
                    error => {
                        console.log(error);
                    });
            })
            .catch(() => console.log('canceled'));
    }
    //---------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------
    onSearch(query: string)
    {
        this.LocationService.getSearchLocations(query)
            .subscribe(
                data => {
                    
                        this.Locationlist=data;
                        this.source = new LocalDataSource(this.Locationlist);  
                        this.source.setSort([{ field: 'locationName', direction: 'asc' }]);
                },
                error => {
                    console.log(error);
                });

        this.source.setSort([{ field: 'locationName', direction: 'asc' }]);
        this.xRecord = this.source.getFilteredAndSorted();
        this.xFilteredRecord = this.xRecord.__zone_symbol__value.length;
        //--compare filtered and nonfiltered record for setting total record
        this.xRecordCount = this.xFilteredRecord <= this.xNonFilteredRecord ? this.xFilteredRecord : this.xNonFilteredRecord;
        let xPaging = this.source.getPaging();
        let xPagingEndPage = xPaging.page * xPaging.perPage;
        //compare maximum value of a page with total record count
        this.xEndPage = xPagingEndPage <= this.xRecordCount ? xPagingEndPage : this.xRecordCount;
        //set Starting Record number
        this.xStartPage = this.xFilteredRecord == 0 ? 0 : 1;
    }
    //---------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------
    //  -- get all location from DB 
     getAllLocations() {
   
        this.source = new LocalDataSource(this.Locationlist); 
        this.LocationService.getAllLocations()
            .subscribe(
                data => {

                  
                        this.Locationlist = data;
                        this.source = new LocalDataSource(this.Locationlist); 
                        this.source.setSort([{ field: 'locationName', direction: 'asc' }]);
                },
                error => {
                    console.log(error);
                });
    }
    //---------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------

}
