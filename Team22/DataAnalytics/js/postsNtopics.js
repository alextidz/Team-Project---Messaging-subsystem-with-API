/* globals Chart:false */

(() => {
  'use strict'



  fetch('http://localhost/API/weeklydata')
      .then(response => {
        console.log('Response:', response);
        return response.text(); // Get the response text
      })
      .then(text => {
        console.log('Response Text:', text); // Log the response text
        // Attempt to parse the response text as JSON
        const data = JSON.parse(text);
        const labels = [];
        const values = [];

        data.forEach(item => {
          const label = item.day_of_week;
          const value = item.data_value;

          if (!labels.includes(label)) {
            labels.push(label);
            values.push(value);
          } else {
            const index = labels.indexOf(label);
            values[index] += value;
          }
        });

        console.log('Labels:', labels);
        console.log('Values:', values);
        // Graphs
        const ctx = document.getElementById('myChart')
        // eslint-disable-next-line no-unused-vars
        const myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              data: values,
              lineTension: 0,
              backgroundColor: '#007bff',
              borderColor: '#007bff',
              borderWidth: 4,
              pointBackgroundColor: '#007bff'
            }]
          },
          options: {
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                boxPadding: 3
              }
            }
          }
        })

      })



})()
