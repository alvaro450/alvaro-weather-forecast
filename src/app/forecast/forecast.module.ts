import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastComponent } from './forecast.component';
import { ForecastRoutingModule } from './forecast-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ForecastInfoModule } from './forecast-info/forecast-info.module';
import { DayPipe } from './forecast-info/day.pipe';

@NgModule({
  imports: [
    CommonModule,
    ForecastRoutingModule,
    MatCardModule,
    MatButtonModule,
    ForecastInfoModule
  ],
  declarations: [ForecastComponent]
})
export class ForecastModule { }