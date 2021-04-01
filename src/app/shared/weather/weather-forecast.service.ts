import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WEATHER_API_KEY } from './weather-api.constants';
import { WEATHER_API } from './weather-api.constants';

@Injectable({
  providedIn: 'root'
})
export class WeatherForecastService {
  
  constructor(private _httpClient: HttpClient) { }

  getWeatherByZipCode(zipcode: string, countryCode = 'us') {
    return this._httpClient.get(`${WEATHER_API}?zip=${zipcode},${countryCode}&units=imperial&appid=${WEATHER_API_KEY}`)
  }

}