import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'farToCelsius'
})
export class ConvertFarenheitToCelsius implements PipeTransform{
    transform(value: number, unit: string) {
        if(value && !isNaN(value)) {
            if (unit === 'C') {
                var temperature = (value - 32) /1.8 ;
                return temperature.toFixed(2);
            } else if (unit === 'F'){
                var temperature = value;
                return temperature.toFixed(2);
            }
        }
        return;
    }
}