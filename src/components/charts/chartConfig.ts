import { numberToDate } from '@/Helpers/Helper.ts'

export const options = {
  responsive: true,
  maintainAspectRatio: true,
  elements: {
    point: {
      pointStyle: true,
    },
  },
  scales: {
    x: {
      display: true,
      type: 'linear',
      grid: {
        display: false,
      },
      ticks: {
        callback: function(value) {
          return numberToDate(value);
        },
      },
    },
    y: {
      display: true,
      type: 'linear',
      ticks: {
        callback: function(value) {
          return `${value}m`;
        }
      }
    },
  },
  interaction: {
    mode: 'nearest',
    intersect: false,
    axis: 'xy',
  },
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      position: 'nearest',
      callbacks: {
        label: function() {
          return null;
        },
        title: function(context) {
          return `${context[0].dataset.label}\nDurée: ${numberToDate(context[0].parsed.x)}\nProfondeur: ${context[0].parsed.y}m`;
        }
      },
    }
  },
};
