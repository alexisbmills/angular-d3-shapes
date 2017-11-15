import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, ViewEncapsulation} from '@angular/core';
import {pie, arc} from 'd3-shape';
import {scaleOrdinal} from 'd3-scale';
import {schemePastel2} from 'd3-scale-chromatic';

@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DonutChartComponent implements OnInit, OnChanges {

  private readonly MAX_ACCENT_RATIO = 1;

  paths: string[];

  colors = scaleOrdinal(schemePastel2);

  @Input() radius = 51;
  @Input() data: number[] = [];
  @Input() thickness = 2;
  @Input() accentIndexes: number[] = [0];
  @Input() accentThicknessRatio = 2;
  @Input() cornerRadius = 2;

  @Input() centerValue;
  @Input() centerDescription;

  @Input() centerValueColor = this.colors(0);
  @Input() centerDescriptionColor = '#000000';

  constructor() {
  }

  ngOnInit(): void {
    this.setPath();
    // console.log(schemeAccent);
    if (this.accentThicknessRatio < this.MAX_ACCENT_RATIO) {
      this.accentThicknessRatio = this.MAX_ACCENT_RATIO;
    }
  }

  get accentThickness() {
    return this.thickness * this.accentThicknessRatio;
  }

  private isAccented(index) {
    return this.accentIndexes.find((accentIndex) => accentIndex === index) >= 0;
  }

  setPath() {
    if (!this.data) {
      return;
    }
    const data = this.data;
    const pieGenerator = pie().sort(() => null);
    const arcs = pieGenerator(data);
    // console.log(arcs);

    const accentInnerRadius = this.radius - this.accentThickness;
    const accentOuterRadius = this.radius;
    const innerRadius = this.radius - this.accentThickness + Math.ceil((this.accentThickness - this.thickness) / 2);
    const outerRadius = this.radius - Math.ceil((this.accentThickness - this.thickness) / 2);
    const maxPrimaryCornerRadius = (outerRadius - innerRadius) / 2;

    const arcGenerator = arc()
      .padAngle(0)
      .cornerRadius((this.cornerRadius > maxPrimaryCornerRadius) ? maxPrimaryCornerRadius : this.cornerRadius);

    // console.log({accentInnerRadius, innerRadius, accentOuterRadius, outerRadius, maxPrimaryCornerRadius});

    this.paths = arcs.map((arcData: any, index: number) => {
      const isAccented = this.isAccented(index);
      return arcGenerator({
        innerRadius: isAccented ? accentInnerRadius : innerRadius,
        outerRadius: isAccented ? accentOuterRadius : outerRadius,
        ...arcData,
      });
    });
    // console.log(this.paths);
  }

  ngOnChanges() {
    this.setPath();
  }
}
