import { Component, OnInit } from '@angular/core';
import { FormControl } from "@angular/forms";
import { NgxSpinnerService } from "ngx-spinner";
import { DashboardService } from '../Services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  ComponentName: any = {};
  selected = new FormControl(0);
  dynamicTabs : any[] =[]

  constructor(
    private DashboardSer: DashboardService,
    private spinner: NgxSpinnerService,
  ) {

  }

  ngOnInit(): void {

    this.DashboardSer.sharedData$.subscribe(sharedData => {
      switch (sharedData) {

        case "Material Category":
         
          break;
      
        default:
          // this.ComponentName = PartyMastComponent
          break;
      }
      let OpenTab;
      OpenTab = this.dynamicTabs.find(x => x.label == sharedData);

      if (OpenTab == undefined) {
        let Obj1 = {
          label: sharedData,
          component: this.ComponentName
        };

        this.dynamicTabs.push(Obj1);

        if (true) {
          this.selected.setValue(this.dynamicTabs.length - 1);
        }
      } else {
        const position = this.dynamicTabs.findIndex(PageName => {
          return PageName.label == sharedData;
        });

        this.selected.setValue(position);
      }
    });

  }
  removeTab(index: number) {
    this.dynamicTabs.splice(index, 1);
  }

  tabChanged(e: any) {
    this.DashboardSer.SetPageTitle(e.index == -1 ? '' : e.tab.textLabel)
  }
  onClick(e: { which: number; }, m: number) {
    if (e.which == 2) {
      this.dynamicTabs.splice(m, 1);
    }

  }
}
