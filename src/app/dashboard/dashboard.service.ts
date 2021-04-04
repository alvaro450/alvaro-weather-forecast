import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { LocalStorageService } from "../core/services/local-storage.service";
import { WeatherResult } from "../core/models/weather.model";
import { WeatherApiService } from "../core/services/weather-api.service";
import { WeatherApiResponse } from "../core/interfaces/weather-api-response.interfaces";

@Injectable({ providedIn: "root" })
export class DashboardService {
  private _storageKey = "alvaro::weather::key";
  private _uniqueLocations = new Set<string>();
  private _locations: WeatherResult<WeatherApiResponse>[] = [];

  constructor(
    private _weatherApiService: WeatherApiService,
    private _localStorageService: LocalStorageService
  ) {}

  addLocation(zipcode: string): Observable<WeatherResult<WeatherApiResponse> | null> {
    if (this._uniqueLocations.has(zipcode)) {
      return of(null);
    }

    this._uniqueLocations.add(zipcode);

    return this._weatherApiService.getWeatherByZipCode(zipcode).pipe(
      tap(weatherResult => {
        this._locations.push(weatherResult);
        // store the updated locations in local storage
        this._localStorageService.set(this._storageKey, this._locations);
      })
    );
  }

  deleteLocation(zipcode: string) {
    this._locations = this._locations.filter(
      location => location.zipcode !== zipcode
    );
    this._uniqueLocations.delete(zipcode);
    this._localStorageService.set(this._storageKey, this._locations);

    return this._locations;
  }

  getStoredLocations() {
    const storedLocations = this._localStorageService.get(
      this._storageKey
    ) as WeatherResult<WeatherApiResponse>[];
    if (!!storedLocations && this._uniqueLocations.size === 0) {
      // populate the private properties
      storedLocations.forEach(storedLocation => {
        this._uniqueLocations.add(storedLocation.zipcode as string);
        this._locations.push(storedLocation);
      });
    }

    return this._locations;
  }
}
