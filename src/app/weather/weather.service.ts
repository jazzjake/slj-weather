import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Observable, catchError, tap, throwError } from "rxjs";
import { environment } from "../environment/environment";

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    //private forecastURL = 'http://api.openweathermap.org/data/2.5/forecast?&APPID=${environment.appId}&units=imperial&zip=';
   //private weatherURL = 'http://api.openweathermap.org/data/2.5/weather?APPID=${environment.appId}&units=imperial&zip=';
    private baseURL = 'http://api.openweathermap.org/data/2.5/';


    constructor(private http: HttpClient) {}

    getWeather(zip: string): Observable<any> {
        
        let url = this.baseURL + 'weather?APPID=' + environment.appId + '&units=imperial&zip=' + zip + ',us';
        console.log('appid: ' + environment.appId)
        
        //return this.http.get(this.weatherURL + zip + ',us');
        return this.http.get(url);
    }

    getForecast(zip: string): Observable<any> {
        let url = this.baseURL + 'forecast?APPID=' + environment.appId + '&units=imperial&zip=' + zip + ',us';
        //return this.http.get(this.forecastURL + zip + ',us');
        return this.http.get(url);
      }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            errorMessage = 'An error occured: ${err.error.message}';
        } else {
            errorMessage = 'server returned code: ${err.status}, error message is: ${err,message}';
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    }

}


