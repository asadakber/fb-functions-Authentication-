import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { NgRedux, NgReduxModule } from 'ng2-redux';
import { combineReducers } from 'redux';
import { RootReducer, AppState, INITIAL_STATE } from '../store/reducers/root.reducers';
import { createEpicMiddleware } from 'redux-observable';
import { AuthEpic } from '../store/epics/auth';
import { HttpModule } from '@angular/http';


export const config = {
  apiKey: "AIzaSyBSqm3etSO3IK5iKv1vYm5M9LGrmxZnXkU",
    authDomain: "mapbox-cb4cc.firebaseapp.com",
    databaseURL: "https://mapbox-cb4cc.firebaseio.com",
    projectId: "mapbox-cb4cc",
    storageBucket: "mapbox-cb4cc.appspot.com",
    messagingSenderId: "931304255160"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgReduxModule,
    HttpModule,
    AngularFirestoreModule.enablePersistence()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthEpic,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
  constructor(private ngRedux: NgRedux<AppState>,private authepic: AuthEpic) {
    const middleware = [
      createEpicMiddleware(this.authepic.login),
      createEpicMiddleware(this.authepic.signup),
      createEpicMiddleware(this.authepic.logout),
    ]
    ngRedux.configureStore(RootReducer, INITIAL_STATE, middleware)
  }
}
