import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Output
} from "@angular/core";
import { WeatherApiResponse } from "../../core/interfaces/weather-api-response.interfaces";
import { WeatherResult } from "../../core/models/weather.model";

@Component({
  selector: "weather-info",
  templateUrl: "./weather-info.component.html",
  styleUrls: ["./weather-info.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherInfoComponent implements OnInit {
  @Input() weatherResult!: WeatherResult<WeatherApiResponse>;
  @Output() remove = new EventEmitter<string>();
  @Output() forecast = new EventEmitter<string>();

  constructor() {}

  ngOnInit() {}

  removeWeatherInfo(zipcode: string) {
    this.remove.next(zipcode);
  }

  forecastInfo($event: MouseEvent, zipcode: string) {
    $event.preventDefault();
    $event.stopPropagation();
    this.forecast.next(zipcode);
  }
}
