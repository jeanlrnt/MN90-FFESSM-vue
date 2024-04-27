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
    },
    y: {
      display: true,
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
