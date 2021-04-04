import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";

@Injectable({ providedIn: "root" })
export class ForecastGuard implements CanActivate {
  constructor(private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const { zipcode } = route.params;

    if (zipcode === null || zipcode === undefined) {
      return this._router.parseUrl("/dashboard");
    }

    return true;
  }
}
