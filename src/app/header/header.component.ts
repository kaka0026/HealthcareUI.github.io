import { Component, OnInit, DoCheck } from '@angular/core';
import { DashboardService } from '../Services/dashboard.service';
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from "../Services/login.service";
import { JwtHelperService } from '@auth0/angular-jwt';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, DoCheck {
  decodeHelper = new JwtHelperService();
  decodedTkn = this.decodeHelper.decodeToken("");
  NAME = "";
  ADDRESS = "";
  PHONE_NO = 0;
  EMAIL_ID = "";
  DOB = "";
  SEX = "";
  AGE = 0;
  MARITAL_STATUS = "";
  IMAGE = "";

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
    this.decodedTkn = this.decodeToken()
    this.NAME = this.decodedTkn.NAME
    this.ADDRESS = this.decodedTkn.ADDRESS
    this.PHONE_NO = this.decodedTkn.PHONE_NO
    this.EMAIL_ID = this.decodedTkn.EMAIL_ID


    var d = new Date(this.decodedTkn.DOB);
    let Fromdate =
      ("0" + d.getDate()).slice(-2) +
      "/" +
      ("0" + (d.getMonth() + 1)).slice(-2) +
      "/" +
      +d.getFullYear();

    this.DOB = Fromdate
    this.SEX = this.decodedTkn.SEX
    this.AGE = this.decodedTkn.AGE
    this.MARITAL_STATUS = this.decodedTkn.MARITAL_STATUS
    this.IMAGE = this.decodedTkn.IMAGE
    this.DashboardSer.sharedPageName$.subscribe((sharedPageName) => {
      try {
        this.pageTitle = sharedPageName ? sharedPageName : 'Dashboard';
      } catch (error) {
      }

    })
  }

  decodeToken() {
    const token = localStorage.getItem("token");
    let decodedTkn = this.decodeHelper.decodeToken("");
    if (token) {
      decodedTkn = this.decodeHelper.decodeToken(token);
     
    } else {
      decodedTkn = this.decodeHelper.decodeToken("");
    }
    return decodedTkn;
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
