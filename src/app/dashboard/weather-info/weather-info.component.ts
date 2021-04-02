import {
  Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  EventEmitter,
  Output
} from "@angular/core";
import { WeatherResult } from "../../shared/models/weather-forecast.model";

@Component({
  selector: "weather-info",
  templateUrl: "./weather-info.component.html",
  styleUrls: ["./weather-info.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherInfoComponent implements OnInit {
  @Input() weatherResult!: WeatherResult;
  @Output() remove = new EventEmitter<string>();
  constructor() {}

  ngOnInit() {}

  removeWeatherInfo(zipcode: string) {
    this.remove.next(zipcode);
  }
}
