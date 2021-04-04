export enum WeatherForecastImage {
  Sun = 'sun.png',
  Snow = 'snow.png',
  Rain = 'rain.png',
  Clouds = 'clouds.png',
  Clear = 'sun.png',
  Drizzle = 'rain.png',
}

export const weatherForecastImageMapping = new Map<string, WeatherForecastImage> ();

weatherForecastImageMapping.set('Clouds', WeatherForecastImage.Clouds);
weatherForecastImageMapping.set('Snow', WeatherForecastImage.Snow);
weatherForecastImageMapping.set('Sun', WeatherForecastImage.Sun);
weatherForecastImageMapping.set('Rain', WeatherForecastImage.Rain);
weatherForecastImageMapping.set('Clear', WeatherForecastImage.Sun);
weatherForecastImageMapping.set('Drizzle', WeatherForecastImage.Rain);