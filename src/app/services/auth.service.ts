import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsuariosModel } from '../models/usuarios';
import { ResponseModel } from '../models/response';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
import { APIENDPOINT } from '../config/configuration';



@Injectable()
export class AuthService extends BaseService<UsuariosModel> {
  
  token: string = null;

  constructor(protected http: HttpClient) {
      super(http, environment.URL);
  }



  logout(): void {
    this.token = '';
    localStorage.removeItem('ACCESS_TOKEN');
  }

  private saveToken(token: string): void {
    localStorage.setItem('ACCESS_TOKEN', token);
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('ACCESS_TOKEN');
    }

    return this.token;

  }

  login(usuario: UsuariosModel) {

    return new Promise(resolve => {
      this.post(APIENDPOINT.getLogin, usuario)
      .subscribe(response => {
        if (response.IsSuccess) {
          //this.saveToken(response.Data['Token']);
          this.saveToken(response.Data['IDUsuario']);
          resolve(response.Data);
        } else {
          console.log('Error Controlado', response.Message);
          this.token = null;
          this.logout();
          resolve(null);

        }
      }, error => {
        console.log('Error', error.error);
        this.token = null;
        this.logout();
        resolve(null);
      });
    });
  }

}
