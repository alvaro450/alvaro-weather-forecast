import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastComponent } from './forecast.component';
import { ForecastRoutingModule } from './forecast-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    CommonModule,
    ForecastRoutingModule,
    MatCardModule,
    MatButtonModule
  ],
  declarations: [ForecastComponent]
})
export class ForecastModule { }