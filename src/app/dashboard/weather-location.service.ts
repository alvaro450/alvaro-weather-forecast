import { Inject, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { LocalStorageService } from "../shared/local-storage.service";
import { WeatherResult } from "../shared/weather/weather-forecast.model";
import { WeatherForecastService } from "../shared/weather/weather-forecast.service";

const WEATHER_STORAGE_KEY = "alvaro::weather::key";
@Injectable({ providedIn: "root" })
export class WeatherLocationService {
  private _uniqueLocations = new Set<string>();
  private _locations: WeatherResult[] = [];

  constructor(
    private _weatherForecaseService: WeatherForecastService,
    private _localStorageService: LocalStorageService
  ) {}

  addLocation(zipcode: string): Observable<WeatherResult> {
    if (this._uniqueLocations.has(zipcode)) {
      return of(null);
    }

    this._uniqueLocations.add(zipcode);

    return this._weatherForecaseService.getWeatherByZipCode(zipcode).pipe(
      tap(weatherResult => {
        this._locations.push(weatherResult);
        // store the updated locations in local storage
        this._localStorageService.set(WEATHER_STORAGE_KEY, this._locations);
      })
    );
  }

  deleteLocation(zipcode: string) {
    this._locations = this._locations.filter(location => location.zipcode !== zipcode);
    this._uniqueLocations.delete(zipcode);
    this._localStorageService.set(WEATHER_STORAGE_KEY, this._locations);

    return this._locations;
  }

  getStoredLocations() {
    const storedLocations = this._localStorageService.get(
      WEATHER_STORAGE_KEY
    ) as WeatherResult[];
    if (!!storedLocations) {
      // populate the private properties
      storedLocations.forEach(storedLocation => {
        this._uniqueLocations.add(storedLocation.zipcode);
        this._locations.push(storedLocation);
      });
    }

    return this._locations;
  }
}
