import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { switchMap, take, tap } from "rxjs/operators";
import { WeatherResult } from "../shared/weather/weather-forecast.model";
import { WeatherLocationService } from "./weather-location.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  locationFormGroup!: FormGroup;
  locations: WeatherResult[];

  private _subscriptions = new Subscription();

  constructor(
    private _fb: FormBuilder,
    private _cdr: ChangeDetectorRef,
    private _weatherLocationService: WeatherLocationService
  ) {}

  ngOnInit() {
    this.locationFormGroup = this._fb.group({
      zipcode: ["", Validators.required]
    });

    this.locations = [...this._weatherLocationService.getStoredLocations()];
    
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  addLocation() {
    this._weatherLocationService
      .addLocation(this.locationFormGroup.controls.zipcode.value)
      .pipe(
        take(1),
        tap(weatherResult => {
          if (weatherResult !== null) {
            this.locations.push(weatherResult);
            this._cdr.markForCheck();
          }
        })
      )
      .subscribe();
  }

  deleteLocation(zipcode: string) {
    this.locations = [...this._weatherLocationService.deleteLocation(zipcode)];
  }

  trackByZipcode(index, item: WeatherResult) {
    return item.zipcode;
  }
}
