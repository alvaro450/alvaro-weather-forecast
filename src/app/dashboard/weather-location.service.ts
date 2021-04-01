import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { WeatherForecastService } from "../shared/weather/weather-forecast.service";


@Injectable({ providedIn: "root" })
export class WeatherLocationService {
  locations = new Set<string>();

  constructor(
    @Inject(DOCUMENT) private _document: Document,
    private _weatherForecaseService: WeatherForecastService
  ) {}

  addLocation(zipcode: string) {
    this.locations.add(zipcode);

    return this._weatherForecaseService.getWeatherByZipCode(zipcode);
  }
}
