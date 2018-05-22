import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '../model/Location.model';
import {appConfig}  from '../appConfig';
import { Observable } from 'rxjs/Observable';
import { Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class LocationService {
    constructor(private http: HttpClient) { }
 
    getById(_id: any): Observable<any>  {
      
        return this.http.get(appConfig.apiUrl + '/locations/' + _id);
        //.map((res: Response) => res.json());
    }
   
    create(location: any) {
     debugger;
         return this.http.post(appConfig.apiUrl + '/places', location);
    }

    update(location: any,id:any) {
    
        return this.http.put(appConfig.apiUrl + '/locations/' + id , location);
       
    }
 
    delete(_id: number) {
       
        return this.http.delete(appConfig.apiUrl + '/locations/' + _id);
    }

    getAllLocations(): Observable<any> {
       
         return this.http.get(appConfig.apiUrl + '/places');
         //.map((res: Response) => res.json());
     }
     
     getSearchLocations(_query:string) {
       
         return this.http.get(appConfig.apiUrl + '/places/' + _query)
         //.map((res: Response) => res.json());
     }

     getSortedLocations(_location:string,_sortby:string,_ordreby:string) {
       
        return this.http.get(appConfig.apiUrl + '/places/' + _location + _sortby + _ordreby);
    }

}