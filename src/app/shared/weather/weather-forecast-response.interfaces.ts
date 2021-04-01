export interface WeatherForecastMain {
  temp: number;
  temp_max: number;
  temp_min: number;
}

export interface WeatherForecastWeather {
  main: string;
  id: number;
  description: string;
  icon: string;
}

export interface WeatherForecastResponse {
  name: string;
  main: WeatherForecastMain;
  weather: WeatherForecastWeather[];
}
