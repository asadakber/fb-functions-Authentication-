import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgRedux, select } from "ng2-redux";
import { AppState } from "../../store/reducers/root.reducers";
import { Http, Headers } from "@angular/http";
import { Observable } from "rxjs";
import { LOGIN } from "../../store/actions/auth";
import { HomePage } from '../../pages/home/home';
import { RegisterPage } from '../../pages/register/register';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  @select((s: AppState) => s.auth.isLoggedIn) isLoggedIn$: Observable<Boolean>;
  loginForm: FormGroup;
  constructor(private ngRedux: NgRedux<AppState>,private http: Http,private fb: FormBuilder,public navCtrl: NavController, public navParams: NavParams) {
    this.loginForm = this.fb.group({
      userEmail: [null, Validators.required],
      userPassword: [null, Validators.required]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.ngRedux.dispatch({
      type: LOGIN,
      payload: this.loginForm.value,
      navCtrl: () => this.navCtrl.push(HomePage)
    })
    this.loginForm.reset()
  }

  goToSignup() {
    this.navCtrl.push(RegisterPage)
  }

}
