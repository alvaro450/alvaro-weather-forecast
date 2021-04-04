import { WeatherApiBaseResponse } from "./weather-api-base-response.interface";

export interface WeatherApiResponse extends WeatherApiBaseResponse {
    name?: string;
}