import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
import Russian from 'flatpickr/dist/l10n/ru.js';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  @ViewChild('startPicker') pickerStart;
  @ViewChild('endPicker') pickerEnd;

  DAY = 86400000;

  startOptions: FlatpickrOptions = {
    locale: Russian.ru,
    mode: 'single',
    dateFormat: 'd.m.Y',
    defaultDate: new Date(Date.now() - (this.DAY*30)),
    maxDate: new Date(Date.now() - this.DAY),
  };

  endOptions: FlatpickrOptions = {
    locale: Russian.ru,
    mode: 'single',
    dateFormat: 'd.m.Y',
    defaultDate: new Date(),
    minDate: new Date(Date.now() - (this.DAY*29)),
    maxDate: new Date(),
  };

  form: FormGroup;


  constructor( 
    private formBuilder: FormBuilder
    ) {
    this.form = formBuilder.group({
      start: new Date(Date.now() - (this.DAY*30)),
      end: new Date()
    });

    // Start Date Changes
    this.form.controls.start.valueChanges.subscribe(changes => {
      // console.log('start: ', changes);
      if (!changes[0]) return;
      const selectedDate = changes[0].getTime();
      const monthLaterDate = selectedDate + (this.DAY*30);
      // console.log(monthLaterDate > Date.now() ? new Date() : new Date(monthLaterDate));
      this.pickerEnd.flatpickr.set({
        maxDate: monthLaterDate > Date.now() ? new Date() : new Date(monthLaterDate),
        minDate: new Date(selectedDate + this.DAY),
      });
      // this.pickerEnd.flatpickr.setDate(monthLaterDate > Date.now() ? new Date() : new Date(monthLaterDate));
      // console.log(this.pickerEnd.flatpickr);
    });

    // End Date Changes
    this.form.controls.end.valueChanges.subscribe(changes => {
      console.log('end: ', changes);
      if (!changes[0]) return;
      const selectedDate = changes[0].getTime();
      this.pickerStart.flatpickr.set({
        maxDate: new Date( selectedDate - this.DAY)
      });

    });

  }

  ngAfterViewInit() {
    // console.log(this.pickerStart);
    console.log(this.pickerStart);
  }

  
}
