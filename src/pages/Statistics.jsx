import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import generateDayWiseTimeSeries from "../utils/generateDayWiseTimeSeries";
import Loading from "../component/loading/Loading";
import dayjs from "dayjs";
import { DatePicker, Space } from "antd";

const { RangePicker } = DatePicker;

const Statistics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current > dayjs().endOf("day");
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const chartOptions1 = {
    series: [
      {
        name: "Blood Pressure",
        type: "column",
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30],
      },
      {
        name: "HearthBeat",
        type: "area",
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
      },
      {
        name: "Cholesterol",
        type: "line",
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
      },
    ],
    options: {
      title: {
        text: "Mix Chart",
        align: "center",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          fontFamily: undefined,
          color: "#263238",
        },
      },
      chart: {
        height: 350,
        type: "line",
        stacked: false,
      },
      stroke: {
        width: [0, 2, 5],
        curve: "smooth",
      },
      plotOptions: {
        bar: {
          columnWidth: "50%",
        },
      },

      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100],
        },
      },
      labels: [
        "01/01/2023",
        "02/01/2023",
        "03/01/2023",
        "04/01/2023",
        "05/01/2023",
        "06/01/2023",
        "07/01/2023",
        "08/01/2023",
        "09/01/2023",
        "10/01/2023",
        "11/01/2023",
      ],
      markers: {
        size: 0,
      },
      xaxis: {
        type: "datetime",
      },
      yaxis: {
        title: {
          text: "Points",
        },
        min: 0,
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " points";
            }
            return y;
          },
        },
      },
    },
  };

  const chartOptions2 = {
    series: [
      {
        name: "HearthBeat",
        data: generateDayWiseTimeSeries(new Date("11 Feb 2023").getTime(), 20, {
          min: 10,
          max: 60,
        }),
      },
    ],
    options: {
      title: {
        text: "Blood Pressure",
        align: "center",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          fontFamily: undefined,
          color: "#263238",
        },
        chart: {
          type: "line",
        },
      },
      colors: ["#008FFB"],
      xaxis: {
        type: "datetime",
      },
    },
  };

  const chartOptions3 = {
    series: [
      {
        name: "SP02",
        data: generateDayWiseTimeSeries(new Date("11 Feb 2023").getTime(), 20, {
          min: 10,
          max: 60,
        }),
      },
    ],
    options: {
      title: {
        text: "HearthBeat Chart",
        align: "center",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          fontFamily: undefined,
          color: "#263238",
        },
      },
      chart: {
        type: "line",
      },
      colors: ["#546E7A"],
      xaxis: {
        type: "datetime",
      },
    },
  };

  const chartOptions4 = {
    series: [
      {
        name: "TEMP",
        data: generateDayWiseTimeSeries(new Date("11 Feb 2023").getTime(), 20, {
          min: 10,
          max: 60,
        }),
      },
    ],
    options: {
      title: {
        text: "Cholesterol Chart",
        align: "center",
        style: {
          fontSize: "14px",
          fontWeight: "bold",
          fontFamily: undefined,
          color: "#263238",
        },
      },
      colors: ["#008FFB"],
      chart: {
        type: "area",
      },
      xaxis: {
        type: "datetime",
      },
    },
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="date_picker">
            <Space direction="vertical" size={12}>
              <RangePicker disabledDate={disabledDate} />
            </Space>
          </div>
          <h2 className="page-header">
            <div className="datetime"></div>
            Statistics
          </h2>
          <div className="row-1">
            <div className="col-md-6">
              <div className="card">
                <div id="chart">
                  <Chart
                    options={chartOptions1.options}
                    series={chartOptions1.series}
                    type="line"
                    height={350}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div id="chart">
                  <Chart
                    options={chartOptions2.options}
                    series={chartOptions2.series}
                    type="line"
                    height={250}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div id="chart">
                  <Chart
                    options={chartOptions3.options}
                    series={chartOptions3.series}
                    type="line"
                    height={250}
                  />
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card">
                <div id="chart">
                  <Chart
                    options={chartOptions4.options}
                    series={chartOptions4.series}
                    type="area"
                    height={250}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;
