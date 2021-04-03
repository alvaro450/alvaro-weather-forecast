import { WeatherApiBaseResponse } from "./weather-api-base-response.interface";

export interface ForecastApiData extends WeatherApiBaseResponse {
  dt: number;
}

export interface ForecastApiResponse {
  list: ForecastApiData[];
}
