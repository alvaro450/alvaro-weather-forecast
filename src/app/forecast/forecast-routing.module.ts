import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ForecastComponent } from './forecast.component';

const ROUTES: Routes = [{
  path: '',
  component: ForecastComponent
}];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES)
  ],
  exports: [RouterModule],
  declarations: []
})
export class ForecastRoutingModule { }