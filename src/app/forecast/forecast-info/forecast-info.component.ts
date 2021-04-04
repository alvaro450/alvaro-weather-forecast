import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy
} from "@angular/core";
import { ForecastApiData } from "../../core/interfaces/forecast-api-response.interfaces";
import { WeatherResult } from "../../core/models/weather.model";

@Component({
  selector: "forecast-info",
  templateUrl: "./forecast-info.component.html",
  styleUrls: ["./forecast-info.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForecastInfoComponent implements OnInit {
  @Input() forecastData!: WeatherResult<ForecastApiData>;

  constructor() {}

  ngOnInit() {}
}
