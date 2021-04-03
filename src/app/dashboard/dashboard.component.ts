import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { take, tap } from "rxjs/operators";
import { WeatherResult } from "../shared/models/weather.model";
import { DashboardService } from "./dashboard.service";

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

  trackByZipcode(index, item: WeatherResult) {
    return item.zipcode;
  }
}
