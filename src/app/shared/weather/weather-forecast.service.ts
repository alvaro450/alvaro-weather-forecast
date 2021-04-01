import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { WEATHER_API_KEY } from "./weather-api.constants";
import { WEATHER_API } from "./weather-api.constants";
import { WeatherForecastResponse } from "./weather-forecast-response.interfaces";
import { WeatherResult } from "./weather-forecast.model";

@Injectable({
  providedIn: "root"
})
export class WeatherForecastService {
  constructor(private _httpClient: HttpClient) {}

  getWeatherByZipCode(
    zipcode: string,
    countryCode = "us"
  ): Observable<WeatherResult> {
    return this._httpClient
      .get<WeatherForecastResponse>(
        `${WEATHER_API}?zip=${zipcode},${countryCode}&units=imperial&appid=${WEATHER_API_KEY}`
      )
      .pipe(
        map(weatherResponse => {
          return new WeatherResult(weatherResponse);
        })
      );
  }
}
