import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// Both of the available paths are lazy loaded
const ROUTES: Routes = [
  {
    path: "dashboard",
    loadChildren: () =>
      import("./dashboard/dashboard.module").then(m => m.DashboardModule)
  },
  {
    path: "forecast/:zipcode",
    loadChildren: () =>
      import("./forecast/forecast.module").then(m => m.ForecastModule)
  },
  { path: "**", redirectTo: "/dashboard", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
