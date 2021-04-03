import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import {
  WEATHER_API_KEY,
  WEATHER_API,
  FORECAST_API
} from "../constants/api.constants";
import { ForecastApiResponse } from "../interfaces/forecast-api-response.interfaces";
import { WeatherApiResponse } from "../interfaces/weather-api-response.interfaces";
import { WeatherResult } from "../models/weather.model";

@Injectable({
  providedIn: "root"
})
export class WeatherApiService {
  constructor(private _httpClient: HttpClient) {}

  getWeatherByZipCode(
    zipcode: string,
    countryCode = "us"
  ): Observable<WeatherResult> {
    return this._httpClient
      .get<WeatherApiResponse>(
        `${WEATHER_API}?zip=${zipcode},${countryCode}&units=imperial&appid=${WEATHER_API_KEY}`
      )
      .pipe(
        map(weatherResponse => {
          return new WeatherResult(weatherResponse, zipcode);
        })
      );
  }

  getFiveDayForecastByZipCode(zipcode: string, countryCode = "us") {
    return this._httpClient
      .get<ForecastApiResponse>(
        `${FORECAST_API}?zip=${zipcode},${countryCode}&units=imperial&appid=${WEATHER_API_KEY}`
      )
      .pipe(
        map(forecastResponse => {
          return new ForecastResult(forecastResponse, zipcode);
        })
      );
  }
}
