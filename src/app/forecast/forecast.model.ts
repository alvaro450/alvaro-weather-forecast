import {
  ForecastApiData,
  ForecastApiResponse,
} from "../core/interfaces/forecast-api-response.interfaces";
import { WeatherResult } from "../core/models/weather.model";

export class ForecastResult {
  zipcode!: string;
  city!: {
    name: string;
  };

  forecastData?: WeatherResult<ForecastApiData>[];

  constructor(forecastApiResponse: ForecastApiResponse, zipcode: string) {
    const { city, list } = forecastApiResponse;

    this.city = city;
    this.zipcode = zipcode;
    this.forecastData = this._mapWeatherData(list);
  }

  private _mapWeatherData(
    list: ForecastApiData[]
  ): WeatherResult<ForecastApiData>[] {
    const weatherData = list.map((weatherItem) => {
      const weatherResult = new WeatherResult<ForecastApiData>(weatherItem);
      weatherResult.dateUnixMilliseconds = weatherItem.dt;
      weatherResult.dateText = weatherItem.dt_txt;
      return weatherResult;
    });
    return weatherData;
  }
}
