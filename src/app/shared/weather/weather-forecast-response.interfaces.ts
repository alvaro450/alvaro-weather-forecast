export interface WeatherForecastResponseMain {
  temp: number;
  temp_max: number;
  temp_min: number;
}

export interface WeatherForecastResponseWeather {
  main: string;
  id: number;
  description: string;
  icon: string;
}

export interface WeatherForecastResponse {
  name: string;
  main: WeatherForecastResponseMain;
  weather: WeatherForecastResponseWeather[];
}
