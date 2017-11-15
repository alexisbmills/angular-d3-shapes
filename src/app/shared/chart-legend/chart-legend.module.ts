import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartLegendComponent} from './component/chart-legend/chart-legend.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ChartLegendComponent],
  exports: [ChartLegendComponent]
})
export class ChartLegendModule {
}
