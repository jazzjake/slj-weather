import { Injectable } from "@angular/core";
import {HttpClient, HttpErrorResponse } from "@angular/common/http"
import { Observable, catchError, tap, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class WeatherService {
    private forecastURL = 'http://api.openweathermap.org/data/2.5/forecast?&APPID=102f1d03e4b125b6231b9199c6e58e11&units=imperial&zip=';
    //private forecastURL = 'http://api.openweathermap.org/data/2.5/forecast?zip=08081,us&APPID=102f1d03e4b125b6231b9199c6e58e11&units=imperial';
    //private weatherURL = 'http://api.openweathermap.org/data/2.5/weather?zip=08081,us&APPID=102f1d03e4b125b6231b9199c6e58e11&units=imperial';
    private weatherURL = 'http://api.openweathermap.org/data/2.5/weather?APPID=102f1d03e4b125b6231b9199c6e58e11&units=imperial&zip=';


    constructor(private http: HttpClient) {}

    getWeather(zip: string): Observable<any> {
        // return this.http.get(this.weatherURL).pipe(
        //     tap(data => console.log('All: ', JSON.stringify(data))),
        //     catchError(this.handleError)
        // );
        return this.http.get(this.weatherURL + zip + ',us');
    }

    getForecast(zip: string): Observable<any> {
        return this.http.get(this.forecastURL + zip + ',us');
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


