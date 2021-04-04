import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from "@angular/core";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router
} from "@angular/router";
import { Subscription } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { ForecastResult } from "./forecast.model";
import { WeatherApiService } from "../core/services/weather-api.service";
import { WeatherData, WeatherResult } from "../core/models/weather.model";
import { ForecastApiData } from "../core/interfaces/forecast-api-response.interfaces";

@Component({
  selector: "app-forecast",
  templateUrl: "./forecast.component.html",
  styleUrls: ["./forecast.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForecastComponent implements OnInit {
  forecast!: ForecastResult;

  constructor(
    private _cdr: ChangeDetectorRef,
    private _activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.forecast = this._activatedRoute.snapshot.data.forecast;
  }

  trackByForecast(index: number, item: WeatherResult<ForecastApiData>) {
    return index;
  }
}
