import { weatherForecastImageMapping } from "./weather-forecast-image.enum";
import {
  WeatherForecastResponseMain,
  WeatherForecastResponse,
  WeatherForecastResponseWeather
} from "./weather-forecast-response.interfaces";

export interface Temperature {
  current: number;
  max: number;
  min: number;
}

export interface WeatherData {
  image: string;
  description: string;
}

export class WeatherResult {
  city: string;
  temperature: Temperature;
  weatherCollection: WeatherData[];
  zipcode: string;

  constructor(
    weatherForecastResponse: WeatherForecastResponse,
    zipcode: string
  ) {
    const { name, main, weather } = weatherForecastResponse;

    this.city = name;
    this.temperature = this._mapTemperature(main);
    this.weatherCollection = weather.map(w => this._mapWeather(w));
    this.zipcode = zipcode;
  }

  private _mapTemperature(main: WeatherForecastResponseMain): Temperature {
    return {
      current: main.temp,
      max: main.temp_max,
      min: main.temp_min
    };
  }

  private _mapWeather(weather: WeatherForecastResponseWeather): WeatherData {
    return {
      image: weatherForecastImageMapping.get(weather.main),
      description: weather.description
    };
  }
}
