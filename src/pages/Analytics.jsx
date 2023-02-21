import React from 'react'
import ReactApexChart from 'react-apexcharts'

const Analytics = () => {

  const analyticRealtime = {
    series: [{
      //data: data.slice()
    }],
    options: {
      chart: {
        id: 'realtime',
        height: 350,
        type: 'line',
        animations: {
          enabled: true,
          easing: 'linear',
          dynamicAnimation: {
            speed: 1000
          }
        },
        toolbar: {
          show: false
        },
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      title: {
        text: 'Dynamic Updating Chart',
        align: 'left'
      },
      markers: {
        size: 0
      },
      xaxis: {
        type: 'time',
        //range: XAXISRANGE,
      },
      yaxis: {
        max: 100
      },
      legend: {
        show: false
      },
    }
  };

  return (
    <div id="chart">
    <h2 className='page-header'>
        Analytics
      </h2>
  <ReactApexChart options={analyticRealtime.options} series={analyticRealtime.series} type="line" height={350} />
</div>
  )
}

export default Analytics