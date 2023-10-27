import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherService } from './weather.service';
import { IForecastData } from '../models/forecastData';
import { IForecastDetails } from '../models/forecastDetails';

@Component({
  selector: 'wa-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.css']
})
export class WeatherForecastComponent implements OnInit {
  tempUnit: string = 'F';

  constructor(private route: ActivatedRoute,
    private weatherService: WeatherService,
    private router: Router) {}

    forecastData = {} as IForecastData;
      

  ngOnInit(): void {
    const zip = this.route.snapshot.paramMap.get('zip');
    const unit = this.route.snapshot.paramMap.get('unit');
    if(unit != null) {
      this.tempUnit = unit;
    }
    this.loadCurrentForecast(zip!);
  }

  loadCurrentForecast(zip: string) {
    this.weatherService.getForecast(zip).subscribe(
   res => {
        this.forecastData.name = res.city.name;
        this.forecastData.details = [];
        for(var i=7; i<res.list.length;i=i+8)//Since we want for 5 days. it Jumps 8 times to get to next day.(A day had 8 details in API.)
        {
          //Instance of type ForecastDetails and stores the data in it.
          var details = {} as IForecastDetails;
              details.date = res.list[i].dt_txt;
              console.log(details.date);
              details.maxTemperature = res.list[i].main.temp_max;
              details.minTemperature = res.list[i].main.temp_min;
              details.description = res.list[i].weather[0].description;
              details.icon = res.list[i].weather[0].icon;
              this.forecastData.details.push(details);//Pushing the data to the to created object

        }
      }
    )
  }

  onBack(): void {
    this.router.navigate(['/weather']);
  }
}
