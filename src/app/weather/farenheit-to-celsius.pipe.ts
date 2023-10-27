import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'farToCelsius'
})
export class ConvertFarenheitToCelsiusPipe implements PipeTransform{
    transform(value: number, unit: string) {
        console.log('unit is:' + unit + ' value:' + value + 'number:' +isNaN(value)  );
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