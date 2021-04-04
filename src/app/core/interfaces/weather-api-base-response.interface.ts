export interface WeatherApiTemperature {
  temp: number;
  temp_max: number;
  temp_min: number;
}

export interface WeatherApiData {
  main: string;
  id: number;
  description: string;
  icon: string;
}

export interface WeatherApiBaseResponse {
  main: WeatherApiTemperature;
  weather: WeatherApiData[];
}
