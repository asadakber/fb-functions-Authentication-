import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgRedux, select } from "ng2-redux";
import { AppState } from "../../store/reducers/root.reducers";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs";
import { SIGNUP } from "../../store/actions/auth";
import { LoginPage } from '../../pages/login/login';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  signupForm: FormGroup;
  constructor(private ngRedux: NgRedux<AppState>,private http: Http,private fb: FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
    this.signupForm = this.fb.group({
      userName: [null, Validators.required],
      userEmail: [null, Validators.required],
      userPassword: [null, Validators.required]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  signup() {
    this.ngRedux.dispatch({
      type: SIGNUP,
      payload: this.signupForm.value,
      navCtrl: () => this.navCtrl.push(LoginPage)
    })
    this.signupForm.reset()
  }

}
