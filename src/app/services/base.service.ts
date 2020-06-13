import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../models/response';


export abstract class BaseService<TModel> {
    public headers: HttpHeaders;
    token: string;

    public responseModel: ResponseModel<any>;
    public _apiRootLocal: string;

    constructor(protected httpClient: HttpClient,
                protected apiRoot: string = environment.URL) {
            this.responseModel = new ResponseModel();
            this._apiRootLocal = environment.URL;
    }
    
    ApplicationAut(isAut:boolean) {
        if (isAut) {
            this.headers = new HttpHeaders({
                'Access-Control-Allow-Origin': '*',
                'Authorization': "bearer " + this.token
            });

        } else {
            this.headers = new HttpHeaders({
                'Access-Control-Allow-Origin': '*'
            });
        }
    }

    get(endPoint: string, isAut: boolean=false, token: string): Observable<ResponseModel<TModel>> {
        const apiURL = `${this.apiRoot}${endPoint}`;
        this.token = token;
        
        this.ApplicationAut(isAut);

        return this.httpClient.get(apiURL, { headers: this.headers })
        .pipe(
            map(
                (resp: ResponseModel<TModel>) =>{
                    
                    this.responseModel.Data = resp.Data;
                    this.responseModel.IsSuccess = resp.IsSuccess;
                    this.responseModel.Message = resp.Message;

                    return this.responseModel;
        }));
    }

    post(endPoint: string, object: TModel, token: string = ""): Observable<ResponseModel<TModel[]>> {
        
        if (token != "") {
            this.token = token;
            this.ApplicationAut(true);
        }

        const apiURL = `${this.apiRoot}${endPoint}`;
        
        return this.httpClient.post(apiURL, object, { headers: this.headers })
        .pipe(
            map(
                (resp: ResponseModel<TModel>) => {
                
                this.responseModel.Data = resp.Data;
                this.responseModel.IsSuccess = resp.IsSuccess;
                this.responseModel.Message = resp.Message;

                return this.responseModel;
            }));
    }

    put(endPoint: string, object: TModel, token: string = ""): Observable<ResponseModel<TModel[]>> {
        
        if (token != "") {
            this.token = token;
            this.ApplicationAut(true);
        }

        const apiURL = `${this.apiRoot}${endPoint}`;
        
        return this.httpClient.put(apiURL, object, { headers: this.headers })
        .pipe(
            map(
                (resp: ResponseModel<TModel>) => {
                
                this.responseModel.Data = resp.Data;
                this.responseModel.IsSuccess = resp.IsSuccess;
                this.responseModel.Message = resp.Message;

                return this.responseModel;
            }));
    }

    delete(endPoint: string, ID: number, token: string = ""): Observable<ResponseModel<TModel[]>> {
        
        if (token != "") {
            this.token = token;
            this.ApplicationAut(true);
        }

        const apiURL = `${this.apiRoot}${endPoint}`;
        
        const options = {
            headers: this.headers
        }

        return this.httpClient.delete(`${apiURL}/${ID}`, options)
        .pipe(
            map(
                (resp: ResponseModel<TModel>) => {
                
                this.responseModel.Data = resp.Data;
                this.responseModel.IsSuccess = resp.IsSuccess;
                this.responseModel.Message = resp.Message;

                return this.responseModel;
            }));
    }
}
