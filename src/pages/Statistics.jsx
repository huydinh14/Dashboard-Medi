import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import moment from "moment";
import statisticApi from "../api/modules/statistic.api";
import { Cascader, DatePicker } from "antd";
import hearthBeatApi from "../api/modules/hearthbeat.api";

const chartMix1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const chartMix2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const chartMix3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const temp = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const chart1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const chart2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const chart3 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const Analytics = () => {
  let xaxisCategories = [];

  const [listIOT, setListIOT] = useState([]);

  const [dataChartMix1, setDataChartMix1] = useState(chartMix1);
  const [dataChartMix2, setDataChartMix2] = useState(chartMix2);
  const [dataChartMix3, setDataChartMix3] = useState(chartMix3);

  const [dataChartMix, setDataChartMix] = useState([]);

  const [dataChart1, setDataChart1] = useState(chart1);
  const [dataChart2, setDataChart2] = useState(chart2);
  const [dataChart3, setDataChart3] = useState(chart3);

  const [ip_mac, setIp_mac] = useState("");
  const [yearChart, setYearChart] = useState(moment().format("YYYY"));
  const [xaxisCategoriesChart, setXaxisCategoriesChart] = useState([]);

  const setYearChart_Y = (year) => {
    const xaxisCategories = [];
    for (let i = 0; i < 12; i++) {
      const month = moment().year(year).month(i);
      xaxisCategories.push(month.format("MM/YYYY"));
    }
    setXaxisCategoriesChart(xaxisCategories);
  };

  const fetch_iot = async () => {
    const { response } = await hearthBeatApi.getAllHB();
    if (response) {
      const data = response.map((item) => {
        return {
          label: item.ip_mac,
          value: item.ip_mac,
        };
      });
      setListIOT(data);
    }
  };
  useEffect(() => {
    fetch_iot();
  }, []);

  useEffect(() => {
    setYearChart_Y(yearChart);
  }, [yearChart]);

  const onChangeIOT = (value) => {
    setIp_mac(value);
  };

  const onChangeYearChart = (date, dateString) => {
    setYearChart(dateString);
  };

  useEffect(() => {
    if (ip_mac === "" || yearChart === "") return;
    console.log(
      "🚀 ~ file: Statistics.jsx:68 ~ useEffect ~ yearChart:",
      yearChart
    );
    const fetchData = async () => {
      const { response } = await statisticApi.getStatisticChart(
        ip_mac,
        yearChart
      );
      console.log(
        "🚀 ~ file: Analytics.jsx:30 ~ fetchData ~ response:",
        response
      );
      if (response) {
        if (response.beat_avgs.length === 0) {
          setDataChartMix1([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
          setDataChartMix2([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
          setDataChartMix3([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
          setDataChart1([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
          setDataChart2([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
          setDataChart3([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
        }
        else
        {
          setDataChartMix(response.beat_avgs);
        }
      }
    };
    fetchData();
  }, [ip_mac, yearChart]);

  useEffect(() => {
    if (dataChartMix && dataChartMix.length > 0) {
      let newAr1 = [...dataChartMix1];
      let newAr2 = [...dataChartMix2];
      let newAr3 = [...dataChartMix3];
      dataChartMix.forEach((item) => {
        const monthTemp = item.month;
        const position = xaxisCategoriesChart.indexOf(monthTemp);
        if (position !== -1) {
          newAr1.splice(position, 1, item.avg);
          newAr2.splice(position, 1, item.bp);
          newAr3.splice(position, 1, item.chol);

          dataChart1.splice(position, 1, item.avg);
          dataChart2.splice(position, 1, item.bp);
          dataChart3.splice(position, 1, item.chol);
        }
      });
      setDataChartMix1(newAr1);
      setDataChartMix2(newAr2);
      setDataChartMix3(newAr3);
    }
  }, [dataChartMix]);

  const chartOptions1 = {
    series: [
      {
        name: "HEARTHBEAT",
        type: "column",
        data: dataChartMix1,
      },
      {
        name: "Blood Pressure",
        type: "area",
        data: dataChartMix2,
      },
      {
        name: "Cholesterol",
        type: "line",
        data: dataChartMix3,
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
      markers: {
        size: 0,
      },
      xaxis: {
        categories: xaxisCategoriesChart,
      },
      yaxis: {
        min: 0,
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y;
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
        data: dataChart1,
        // data: generateDayWiseTimeSeries(new Date("11 Feb 2023").getTime(), 20, {
        //   min: 10,
        //   max: 60,
        // }),
      },
    ],
    options: {
      title: {
        text: "HearBeat Chart",
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
        categories: xaxisCategoriesChart,
      },
    },
  };

  const chartOptions3 = {
    series: [
      {
        name: "Blood Pressure",
        data: dataChart2,
      },
    ],
    options: {
      title: {
        text: "Blood Pressure Chart",
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
        categories: xaxisCategoriesChart,
      },
    },
  };

  const chartOptions4 = {
    series: [
      {
        name: "Cholesterol",
        data: dataChart3,
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
        categories: xaxisCategoriesChart,
      },
    },
  };

  return (
    <div>
      <div className="analytic_cbb">
        <Cascader
          style={{
            width: "25%",
          }}
          status="error"
          placeholder="Choose device"
          maxTagCount="responsive"
          options={listIOT}
          onChange={onChangeIOT}
        />
        <DatePicker
          onChange={onChangeYearChart}
          picker="year"
          style={{ marginLeft: "5px" }}
        />
      </div>
      <h2 className="page-header">Pathogens</h2>
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
  );
};

export default Analytics;
