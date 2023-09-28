import { Component, Input, OnInit } from '@angular/core';
import { getCSSVariableValue } from '../../../../../kt/_utils';
@Component({
  selector: 'app-mixed-widget8',
  templateUrl: './mixed-widget8.component.html',
})
export class MixedWidget8Component implements OnInit {
  @Input() chartColor = '';
  @Input() chartHeight: string;
  chartOptions: any = {};


  ngOnInit(): void {
    this.chartOptions = getChartOptions(this.chartHeight, this.chartColor);
  }

  refreshCharts() {
    return getChartOptions(this.chartHeight, this.chartColor);
  }
}

function getChartOptions(chartHeight: string, chartColor: string) {
  const labelColor = getCSSVariableValue('--bs-gray-800');
  const strokeColor = getCSSVariableValue('--bs-gray-300');
  const baseColor = getCSSVariableValue('--bs-' + chartColor);
  const lightColor = getCSSVariableValue('--bs-' + chartColor + '-light');

  return {
    series: [
      {
        name: 'Nuevos Usuarios',
        data: [12, 25, 18, 40, 30, 15, 22],
      },
    ],
    chart: {
      fontFamily: 'inherit',
      type: 'area',
      height: chartHeight,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {},
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'solid',
      opacity: 1,
    },
    fill1: {
      type: 'gradient',
      opacity: 1,
      gradient: {
        type: 'vertical',
        shadeIntensity: 0.5,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 0.375,
        stops: [25, 50, 100],
        colorStops: [],
      },
    },
    stroke: {
      curve: 'smooth',
      show: true,
      width: 3,
      colors: [baseColor],
    },
    xaxis: {
      categories: ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
      crosshairs: {
        show: false,
        position: 'front',
        stroke: {
          color: strokeColor,
          width: 1,
          dashArray: 3,
        },
      },
      tooltip: {
        enabled: true,
        formatter: undefined,
        offsetY: 0,
        style: {
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      min: 0,
      max: 65,
      labels: {
        show: false,
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val: any) {
          return val + ' nuevos usuarios';
        },
      },
    },
    colors: [lightColor],
    markers: {
      colors: [lightColor],
      strokeColor: [baseColor],
      strokeWidth: 3,
    },
  };
}
