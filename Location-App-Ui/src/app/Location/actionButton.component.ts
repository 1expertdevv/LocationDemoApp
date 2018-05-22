
import { Component, Input, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { LocationListComponent } from './LocationList.component';

@Component({
    selector: 'button-Render',
    template: `
            <div class="dropdown pull-left">
               <a class="dropdown-toggle" data-toggle="dropdown" style="cursor:pointer"><span class="glyphicon glyphicon-tasks"></span><span class="caret"></span></a>
               <ul class="dropdown-menu markBlue" style="background-color:#f4f4f4;">
                  <li *ngIf="xEnableEdit"><a (click)="EmitValue('edit')"><span class="glyphicon glyphicon-edit"></span>Edit</a> </li>
                  <li *ngIf="xEnableDelete"><a (click)="EmitValue('delete')"><span class="glyphicon glyphicon-trash"></span>  Delete</a> </li>
               </ul>
            </div>
  `,
})
 
export class ActionButtonComponent implements OnInit {

    public ActionType: any;
    rowData: any;
    xEnableEdit: boolean = false;
    xEnableDelete: boolean = false;
    xEnableActions: Array<any>;
    @Output() id: EventEmitter<any> = new EventEmitter();
    //---------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------

    ngOnInit() {
        //  Enabling or disabling the action 
        for (let i = 0; i < this.xEnableActions.length; i++) {
            switch (this.xEnableActions[i].actionType.toLowerCase()) {
                case 'edit':
                    this.xEnableEdit = this.xEnableActions[i].enable;
                    break;
                case 'delete':
                    this.xEnableDelete = this.xEnableActions[i].enable;
                    break;
                default:
                    console.error('Something wrong in Action list');
                    break;
            }
        }
    }
    //---------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------
    // exposing resultset on button click

    EmitValue(a_xActionType: string) {
        this.ActionType = a_xActionType;
        this.id.emit(this);
    }
   //---------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------

}