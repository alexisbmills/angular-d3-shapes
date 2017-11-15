import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DonutChartComponent} from './component/donut-chart/donut-chart.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DonutChartComponent
  ],
  exports: [
    DonutChartComponent
  ]
})
export class DonutChartModule {
}
