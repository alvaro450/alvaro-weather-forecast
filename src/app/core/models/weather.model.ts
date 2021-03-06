import * as dayjs from "dayjs";
import { IMAGE_URL_BASE } from "../constants/api.constants";
import { weatherForecastImageMapping } from "../constants/images.constants";
import { WeatherApiData, WeatherApiTemperature } from "../interfaces/weather-api-base-response.interface";
import {
  WeatherApiResponse
} from "../interfaces/weather-api-response.interfaces";


export interface Temperature {
  current: number;
  max: number;
  min: number;
}

export interface WeatherData {
  name: string;
  image: string;
  description: string;
}

export class WeatherResult<T extends WeatherApiResponse> {
  city?: string;
  dateUnixMilliseconds?: number;
  dateText?: string;
  temperature: Temperature;
  weatherCollection: WeatherData[];
  zipcode?: string;

  constructor(response: T, zipcode?: string) {
    const { name, main, weather } = response;
    this.city = name;
    this.temperature = this._mapTemperature(main);
    this.weatherCollection = weather.map(w => this._mapWeather(w));
    this.zipcode = zipcode;
  }

  private _mapTemperature(main: WeatherApiTemperature): Temperature {
    return {
      current: main.temp,
      max: main.temp_max,
      min: main.temp_min
    };
  }

  private _mapWeather(weather: WeatherApiData): WeatherData {
    return {
      image: `${IMAGE_URL_BASE}${weatherForecastImageMapping.get(
        weather.main
      )}`,
      name: weather.main,
      description: weather.description
    };
  }
}
