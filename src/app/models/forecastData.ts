import {IForecastDetails} from './forecastDetails'

export interface IForecastData {
    name : string
    //Deatils array of type ForecastDetails class.
    details : Array<IForecastDetails> ;
  }