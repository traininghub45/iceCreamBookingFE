import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

  private lineChartAnimationDelay = 80;
  private lineChartAnimationDuration = 500;

  constructor() { }

  private startAnimationForLineChart(chart: any): void {
    let seq = 0;

    chart.on('draw', (data: any) => {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * this.lineChartAnimationDelay,
            dur: this.lineChartAnimationDuration,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  }

  private startAnimationForBarChart(chart: any): void {
    let seq = 0;

    chart.on('draw', (data: any) => {
      if (data.type === 'bar') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * this.lineChartAnimationDelay,
            dur: this.lineChartAnimationDuration,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  }

  ngOnInit(): void {
    // Daily Sales Chart
    const dataDailySalesChart = {
      labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      series: [[12, 17, 7, 17, 23, 18, 38]]
    };

    const optionsDailySalesChart = {
      lineSmooth: Chartist.Interpolation.cardinal({ tension: 0 }),
      low: 0,
      high: 50,
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    };

    const dailySalesChart = new Chartist.LineChart('#dailySalesChart', dataDailySalesChart, optionsDailySalesChart);
    this.startAnimationForLineChart(dailySalesChart);

    // Completed Tasks Chart
    const dataCompletedTasksChart = {
      labels: ['12p', '3p', '6p', '9p', '12p', '3a', '6a', '9a'],
      series: [[230, 750, 450, 300, 280, 240, 200, 190]]
    };

    const optionsCompletedTasksChart = {
      lineSmooth: Chartist.Interpolation.cardinal({ tension: 0 }),
      low: 0,
      high: 1000,
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    };

    const completedTasksChart = new Chartist.LineChart('#completedTasksChart', dataCompletedTasksChart, optionsCompletedTasksChart);
    this.startAnimationForLineChart(completedTasksChart);

    // Emails Subscription Chart
    const dataWebsiteViewsChart = {
      labels: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
      series: [[542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895]]
    };

    const optionsWebsiteViewsChart = {
      axisX: { showGrid: false },
      low: 0,
      high: 1000,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 },
    };

    const responsiveOptions = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: (value: string) => value[0],
        }
      }]
    ];

    const websiteViewsChart = new Chartist.BarChart('#websiteViewsChart', dataWebsiteViewsChart, optionsWebsiteViewsChart);
    this.startAnimationForBarChart(websiteViewsChart);
  }

  ngOnDestroy(): void {
    // Cleanup code here if needed
  }
}
