import { WeatherApiBaseResponse } from "./weather-api-base-response.interface";

export interface ForecastApiData extends WeatherApiBaseResponse {
  dt: number;
  dt_txt: string;
}

export interface ForecastApiCity {
  name: string
}

export interface ForecastApiResponse {
  list: ForecastApiData[];
  city: ForecastApiCity;
}
