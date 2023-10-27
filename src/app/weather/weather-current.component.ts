import {Component, OnDestroy, OnInit, Input} from "@angular/core";
import { Subscription } from "rxjs";
import { WeatherService } from "./weather.service";
import { IWeatherData } from "../models/weatherData";


@Component({
    selector: 'current-weather',
    templateUrl: './weather-current.component.html'
})
export class WeatherCurrrent implements OnInit, OnDestroy {
    //@Input() zip: string ='';
    sub!: Subscription;
    errorMessage: string = '';
    zips: string[] =    ['10026', '19109'];
    //newZip: string = '';
    tempUnit: string = 'F';
    
    
    private _newZip: string = '';
    get newZip(): string {
        return this._newZip;
    }
    set newZip(value: string) {
        this._newZip =value;
        if(this._newZip.length ===5 && !isNaN(parseInt(this._newZip))) {
            if(!this.zips.includes(this._newZip)){
                this.zips.push(this._newZip);
                this.loadCurrentWeather(this._newZip);
                localStorage.setItem("slj", JSON.stringify(this.zips));
                this._newZip = '';
            }
        }

    }
    

    constructor(private weatherService: WeatherService) {}

    //weatherData = {} as IWeatherData;
    conditions: IWeatherData[] = [] ;

    ngOnInit(): void {
        let localZip =localStorage.getItem("slj")
        if(localZip != null && localZip != undefined){
            this.zips = JSON.parse(localZip);
        }
        console.log("My stored stuff: " + localZip);
        for(var index in this.zips) {
        this.loadCurrentWeather(this.zips[index]);
        }
    }

    loadCurrentWeather(zip: string) {
        let weatherData = {} as IWeatherData;
        this.weatherService.getWeather(zip).subscribe(
       res => {
            weatherData.cityName = res.name;
            weatherData.zip = zip;
            weatherData.description = res.weather[0].description;
            weatherData.currentTemperature=   res.main.temp;
            weatherData.icon = res.weather[0].icon;
            weatherData.maxTemperature=res.main.temp_max;
            weatherData.minTemperature = res.main.temp_min;
            console.log('weather data2 is:', weatherData);
            this.conditions.push(weatherData);
       }
      );
    }

    removeZip(zip: string): void {
        console.log('Remove zip ' + zip);
        this.zips = this.zips.filter((e, i) => e !== zip);
        localStorage.setItem("slj", JSON.stringify(this.zips));
        this.conditions = this.conditions.filter(e => e.zip !== zip);
    }
    
    toggleUnit(): void {
        this.tempUnit = this.tempUnit === 'F' ? 'C' : 'F';
        console.log('current unit:' + this.tempUnit);
    }
    ngOnDestroy(): void { }
};