import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router
} from "@angular/router";

@Component({
  selector: "app-forecast",
  templateUrl: "./forecast.component.html",
  styleUrls: ["./forecast.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForecastComponent implements OnInit {
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _activatedRouteSnapshot: ActivatedRouteSnapshot
  ) {}

  ngOnInit() {
    this._activatedRoute.params.subscribe({ next: p => console.log(p) });
  }
}
