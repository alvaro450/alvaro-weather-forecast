import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastInfoComponent } from './forecast-info.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { DayPipe } from './day.pipe';

@NgModule({
  imports: [
    MatCardModule,
    MatButtonModule,
    CommonModule,
  ],
  declarations: [ForecastInfoComponent, DayPipe],
  exports: [
    DayPipe,
    ForecastInfoComponent
  ]
})
export class ForecastInfoModule { }