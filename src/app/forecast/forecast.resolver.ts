import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ForecastResult } from './forecast.model'
import { WeatherApiService} from '../core/services/weather-api.service';

@Injectable({ providedIn: 'root' })
export class ForecastResolver implements Resolve<ForecastResult | null> {

    constructor(private _weatherApiService: WeatherApiService, private _router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<ForecastResult | null>  {
        const { zipcode} = route.params;

        return  this._weatherApiService.getFiveDayForecastByZipCode(zipcode);
    }
}