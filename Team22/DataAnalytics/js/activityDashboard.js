/* globals Chart:false */

(() => {
  'use strict'


  // Graphs
  const ctx = document.getElementById('myChart')
  // eslint-disable-next-line no-unused-vars
  const myChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: [
        'Team 1',
        'Team 2',
        'Team 3',
        'Team 4',
        'Team 5',
        'Team 6',
        'Team 7'
      ],
      datasets: [{
        data: [
          4,
          5,
          2,
          7,
          5,
          4,
          3
        ],
        lineTension: 0,
        backgroundColor: '#007bff',
        borderColor: 'white',
        borderWidth: 2,
        pointBackgroundColor: '#007bff'
      }]
    },
    options: {
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          boxPadding: 7
        }
      }
    }
  })
})()

