import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { Component, Input, OnInit } from '@angular/core';
import { WeatherResult } from '../../shared/weather/weather-forecast.model';

@Component({
  selector: 'app-weather-info',
  templateUrl: './weather-info.component.html',
  styleUrls: ['./weather-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherInfoComponent implements OnInit {
  @Input() weatherResult!: WeatherResult;
  
  constructor() { }

  ngOnInit() {
  }

}