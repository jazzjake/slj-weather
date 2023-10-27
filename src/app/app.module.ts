import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WeatherCurrrent } from './weather/weather-current.component';
import { RouterModule } from '@angular/router';
import { WeatherForecastComponent } from './weather/weather-forecast.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    WeatherCurrrent,
    WeatherForecastComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'weather', component: WeatherCurrrent },
      { path: 'forecast/:zip', component: WeatherForecastComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
