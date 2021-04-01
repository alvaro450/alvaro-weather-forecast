import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherInfoComponent } from './weather-info.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule
  ],
  declarations: [WeatherInfoComponent],
  exports: [WeatherInfoComponent]
})
export class WeatherInfoModule { }