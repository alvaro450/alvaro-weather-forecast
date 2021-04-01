import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { WeatherInfoModule } from './weather-info/weather-info.module';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    DashboardRoutingModule,
    WeatherInfoModule
  ],
  declarations: [DashboardComponent],
  providers: []
})
export class DashboardModule { }