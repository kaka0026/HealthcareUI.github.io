import { Component, OnInit, DoCheck } from '@angular/core';
import { DashboardService } from '../Services/dashboard.service';
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { JwtHelperService } from "@auth0/angular-jwt";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from "../Services/login.service";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
   decodeHelper = new JwtHelperService();
  // decodedTkn = this.decodeHelper.decodeToken(localStorage.getItem("token"));

  hide = true;
  Newhide = true;
  ReNewhide = true;
  pageTitle: any = "";

  OLDPASS: any = "";
  NEWPASS: any = "";
  REENTERPASS: any = "";

  DolToINR: any = '';

  PERARR = []
  GROUPARR = []

  constructor(
    private router: Router,
    private DashboardSer: DashboardService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    private LoginSer: LoginService
  ) {
    this.pageTitle = "Dashboard";
  }
  ngOnInit(): void {
    this.DollarToINR();
    this.DashboardSer.sharedPageName$.subscribe((sharedPageName) => {
      try {
        this.pageTitle = sharedPageName ? sharedPageName : 'Dashboard';
      } catch (error) {
      }

    })

   

  }
  CHECKPER(e: any): boolean {
    // if (this.PERARR.filter(x => x == e).length == 0) {
    //   return false
    // } else {
      return true
    // }
  }
  CHECKTAB(e: any): boolean {
    // if (this.GROUPARR.filter(x => x == e).length == 0) {
    //   return false
    // } else {
      return true
    // }
  }
  ngDoCheck() {
    this.spinner.hide();
  }
  AddTab(Page: any) {
    this.pageTitle = Page;
    this.DashboardSer.setData(Page);
  }
  LogOut() {
    localStorage.clear();
    this.router.navigateByUrl("/login");
  }
  DollarToINR() {
   
  }
  changepass() {
    
  }
  comparepass() {
    if (this.REENTERPASS != this.NEWPASS) {
      this.spinner.hide();
      this.toastr.clear();
      this.toastr.error("Password Not Match");
      this.REENTERPASS = "";
    }
    this.spinner.hide();
  }
}
