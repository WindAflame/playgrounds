import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  exampleForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.exampleForm = this.fb.group({
      text1: [''],
      text2: [''],
      text3: [''],
      text4: ['']
    });

   this.exampleForm.get('text1').disable();
   this.exampleForm.get('text3').enable();
  }

  doNothing() {}

}
