import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import {
  WEATHER_API_KEY,
  WEATHER_API,
  FORECAST_API,
} from "../constants/api.constants";
import {
  ForecastApiData,
  ForecastApiResponse,
} from "../interfaces/forecast-api-response.interfaces";
import { WeatherApiResponse } from "../interfaces/weather-api-response.interfaces";
import { ForecastResult } from "../../forecast/forecast.model";
import { WeatherResult } from "../models/weather.model";

@Injectable({
  providedIn: "root",
})
export class WeatherApiService {
  constructor(private _httpClient: HttpClient) {}

  getWeatherByZipCode(
    zipcode: string,
    countryCode = "us"
  ): Observable<WeatherResult<WeatherApiResponse>> {
    return this._httpClient
      .get<WeatherApiResponse>(
        `${WEATHER_API}?zip=${zipcode},${countryCode}&units=imperial&appid=${WEATHER_API_KEY}`
      )
      .pipe(
        map((weatherResponse) => {
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
        // since the API returns 6 days and for each day 3 hours interval weather data
        // lets limit the response to 5 days an only one per day
        map((forecastResponse) => {
          const filteredResponse: ForecastApiResponse = { ...forecastResponse };
          const uniqueDates = new Set<string>();
          filteredResponse.list = forecastResponse.list.reduce(
            (acc, forecastData) => {
              const dateText = forecastData.dt_txt.substr(
                0,
                forecastData.dt_txt.indexOf(" ")
              );

              // if we already have an entry for a given date or we already have 5 days collected
              if (uniqueDates.has(dateText) || uniqueDates.size >= 5 || forecastData.dt_txt.includes('00:00:00')) {
                return acc;
              }

              acc.push(forecastData);
              uniqueDates.add(dateText);

              return acc;
            },
            [] as ForecastApiData[]
          );

          return filteredResponse;
        }),
        map((forecastResponse) => {
          return new ForecastResult(forecastResponse, zipcode);
        }),
        catchError((error) => {
          console.error(error);
          return of(null);
        })
      );
  }
}
