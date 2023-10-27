import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { WeatherCurrrent } from './weather/weather-current.component';
import { RouterModule } from '@angular/router';
import { WeatherForecastComponent } from './weather/weather-forecast.component';
import { FormsModule } from '@angular/forms';
import { ConvertFarenheitToCelsiusPipe } from './weather/farenheit-to-celsius.pipe';


@NgModule({
  declarations: [
    AppComponent,
    WeatherCurrrent,
    WeatherForecastComponent,
    ConvertFarenheitToCelsiusPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'weather', component: WeatherCurrrent },
      { path: 'forecast/:zip', component: WeatherForecastComponent },
      { path: 'forecast/:zip/:unit', component: WeatherForecastComponent },
      { path: '', component: WeatherCurrrent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
