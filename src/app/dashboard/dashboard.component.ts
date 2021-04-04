import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { take, tap } from "rxjs/operators";
import { WeatherApiResponse } from "../core/interfaces/weather-api-response.interfaces";
import { WeatherResult } from "../core/models/weather.model";
import { DashboardService } from "./dashboard.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  locationFormGroup!: FormGroup;
  locations!: WeatherResult<WeatherApiResponse>[];

  private _subscriptions = new Subscription();

  constructor(
    private _fb: FormBuilder,
    private _cdr: ChangeDetectorRef,
    private _router: Router,
    private _dashboardService: DashboardService
  ) {}

  ngOnInit() {
    this.locationFormGroup = this._fb.group({
      zipcode: ["", Validators.required]
    });

    this.locations = [...this._dashboardService.getStoredLocations()];
  }

  ngOnDestroy() {
    this._subscriptions.unsubscribe();
  }

  navigateToForecast(zipcode: string) {
    this._router.navigate(['forecast', zipcode]);
  }

  addLocation() {
    this._dashboardService
      .addLocation(this.locationFormGroup.controls.zipcode.value)
      .pipe(
        take(1),
        tap(weatherResult => {
          if (weatherResult !== null) {
            this.locations.push(weatherResult);
            // clear the input after a successful add
            this.locationFormGroup.reset();
            this._cdr.markForCheck();
          }
        })
      )
      .subscribe();
  }

  deleteLocation(zipcode: string) {
    this.locations = [...this._dashboardService.deleteLocation(zipcode)];
  }

  trackByZipcode(index: number, item: WeatherResult<WeatherApiResponse>) {
    return item.zipcode;
  }
}
