import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {DonutChartModule} from './shared/donut-chart/donut-chart.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ChartLegendModule} from './shared/chart-legend/chart-legend.module';
import {MAT_PLACEHOLDER_GLOBAL_OPTIONS, MatInputModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    DonutChartModule,
    ChartLegendModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  providers: [
    {provide: MAT_PLACEHOLDER_GLOBAL_OPTIONS, useValue: {float: 'always'}},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
