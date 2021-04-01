import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  locationFormGroup!: FormGroup;
  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    this.locationFormGroup = this._fb.group({
      zipcode: ['', Validators.required]
    })
  }
}
