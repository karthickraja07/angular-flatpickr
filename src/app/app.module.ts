import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

import { Ng2FlatpickrModule } from 'ng2-flatpickr';

@NgModule({
  imports:      [ BrowserModule, FormsModule, ReactiveFormsModule , Ng2FlatpickrModule ],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
