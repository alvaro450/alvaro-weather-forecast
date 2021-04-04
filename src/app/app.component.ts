import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "weather-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  
  constructor(private _router: Router) {
    
  }

  ngOnInit() {

  }
}
