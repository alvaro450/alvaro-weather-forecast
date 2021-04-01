import {WeatherForecastResponse } from './weather-forecast-response.interfaces';
export class WeatherLocation {
  city: string;
  temperature: {
    current: number;
    max: number;
    min: number;
  };
  weather: {
    image: string;
    description: string;
    key: string;
  };

  constructor(weatherForecastResponse: WeatherForecastResponse) {
    const { name, main, weather } = weatherForecastResponse;

    this.city = name;
    this.temperature = {
      current: main.temp,
      max: main.temp_max,
      min: main.temp_min
    };

    this.
  }

  private _mapTemperature(main) {}
}
