import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root',
})
export class AuthGoogleService {
  constructor(private oauthService: OAuthService) {
    this.initLogin();
  }

  initLogin() {
    const config: AuthConfig = {
      issuer: 'https://accounts.google.com',
      strictDiscoveryDocumentValidation: false,
      clientId: '981520994137-jeoi9je1nikppgossau431aa4c070ge2.apps.googleusercontent.com',
      redirectUri: window.location.origin + '/validatelogin',
      scope: 'openid profile email',
    };

    this.oauthService.configure(config);
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocumentAndTryLogin();    
  }

  login(){
    this.oauthService.initLoginFlow();    
  }

  logout(){
    this.oauthService.logOut();
  }

  getProfile(){
    return this.oauthService.getIdentityClaims();
  }
  getToken(){
    return this.oauthService.getIdToken();
  }

}
