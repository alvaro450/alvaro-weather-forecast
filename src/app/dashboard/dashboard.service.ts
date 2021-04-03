import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { LocalStorageService } from "../shared/services/local-storage.service";
import { WeatherResult } from "../shared/models/weather.model";
import { WeatherApiService } from "../shared/services/weather-api.service";

@Injectable({ providedIn: "root" })
export class DashboardService {
  private _storageKey = "alvaro::weather::key";
  private _uniqueLocations = new Set<string>();
  private _locations: WeatherResult[] = [];

  constructor(
    private _weatherApiService: WeatherApiService,
    private _localStorageService: LocalStorageService
  ) {}

  addLocation(zipcode: string): Observable<WeatherResult> {
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
