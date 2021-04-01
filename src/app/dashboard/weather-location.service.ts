import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { of } from "rxjs";
import { tap } from "rxjs/operators";
import { WeatherResult } from "../shared/weather/weather-forecast.model";
import { WeatherForecastService } from "../shared/weather/weather-forecast.service";

@Injectable({ providedIn: "root" })
export class WeatherLocationService {
  locations = new Set<string>();
  locationsMap = new Map<string, WeatherResult>();

  constructor(private _weatherForecaseService: WeatherForecastService) {}

  addLocation(zipcode: string) {
    if (this.locations.has(zipcode)) {
      return of(null);
    }

    this.locations.add(zipcode);

    return this._weatherForecaseService.getWeatherByZipCode(zipcode).pipe(
      tap(weatherResult => {
        this.locationsMap.set(zipcode, weatherResult);
      })
    );
  }
}
