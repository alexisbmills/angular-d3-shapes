import {ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {scaleOrdinal} from 'd3-scale';
import {schemePastel2} from 'd3-scale-chromatic';

export interface LegendItem {
  color?: string;
  label: string;
  description: string;
}

@Component({
  selector: 'app-chart-legend',
  templateUrl: './chart-legend.component.html',
  styleUrls: ['./chart-legend.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartLegendComponent implements OnInit {

  @Input() legend: LegendItem[];

  colors = scaleOrdinal(schemePastel2);

  color(item: LegendItem, index: number) {
    return item.color || this.colors(index);
  }

  constructor() {
  }

  ngOnInit() {
  }
}
