import React from "react";
import statusCards from "../assets/JsonData/status-card-data.json";
import StatusCard from "../component/status-card/StatusCard";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import Table from "../component/table/Table";

const chartOptions = {
  series: [
    {
      name: "Online Customers",
      data: [40, 70, 20, 90, 36, 80, 30, 91, 60],
    },
    {
      name: "Store Customers",
      data: [40, 30, 70, 80, 40, 16, 40, 20, 51, 10],
    },
  ],
  options: {
    color: ["#6ab04c", "#2980b9"],
    chart: {
      background: "transparent",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    legend: {
      position: "top",
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
  },
};

const topConditionRules = {
  head: ["name", "total used"],
  body: [
    {
      username: "Law of diabetes",
      order: "490",
    },
    {
      username: "Law of pneumonia",
      order: "250",
    },
    {
      username: "Law of cancer",
      order: "120",
    },
    {
      username: "Law infarction",
      order: "110",
    },
    {
      username: "Law of asthma",
      order: "80",
    }
  ],
};

const renderCusomerHead = (item, index) => (
  <th key={index}>{item}</th>
)

const renderCusomerBody = (item, index) => (
  <tr key={index}>
      <td>{item.username}</td>
      <td>{item.order}</td>
      <td>{item.price}</td>
  </tr>
)

const latestOrders = {
  header: [
      "doctor id",
      "name",
      "total medical",
      "date",
      "hospital name"
  ],
  body: [
      {
          id: "#DT1711",
          user: "Dam Bich Kim",
          date: "17 Jun 2023",
          price: "420",
          status: "BV Quan Doi 175"
      },
      {
          id: "#DT1712",
          user: "To Ngoc Van",
          date: "1 Jun 2023",
          price: "300",
          status: "BV Binh Dan"
      },
      {
          id: "#DT1713",
          user: "Nguyen Hai",
          date: "27 Jun 2023",
          price: "280",
          status: "BV Hoan My"
      },
      {
          id: "#DT1712",
          user: "Bui Tuan",
          date: "1 Jun 2023",
          price: "220",
          status: "BV Dai Học Y Duoc"
      },
      {
          id: "#DT1713",
          user: "Dam Hieu",
          date: "27 Jun 2023",
          price: "120",
          status: "BV Cho Ray"
      }
  ]
}

const orderStatus = {
  "shipping": "primary",
  "pending": "warning",
  "paid": "success",
  "refund": "danger"
}

const renderOrderHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderOrderBody = (item, index) => (
  <tr key={index}>
      <td>{item.id}</td>
      <td>{item.user}</td>
      <td>{item.price}</td>
      <td>{item.date}</td>
      <td>
          <span>{item.status}</span>
      </td>
  </tr>
)

const Dashboard = () => {
  return (
    <div>
      <h2 className="page-header">Dashboard</h2>
      <div className="row">
        <div className="col-5">
          <div className="row">
            {statusCards.map((item, index) => (
              <div className="col-6" key={index}>
                <StatusCard
                  icon={item.icon}
                  count={item.count}
                  title={item.title}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="col-7">
          <div className="card full-height">
            <Chart
              options={chartOptions.options}
              series={chartOptions.series}
              type='line'
              height='100%'
            />
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <div className="card-header">
              <h3>Top 5 Conditions-Rule</h3>
            </div>
            <div className="card-body-cus">
                <Table 
                headData= {topConditionRules.head}
                renderHead={(item, index) => renderCusomerHead(item, index)}
                bodyData = {topConditionRules.body}
                renderBody={(item, index) => renderCusomerBody(item, index)}/>
            </div>
            {/* <div className="card-footer"> */}
              {/* <Link to ='/'>View all</Link> */}
            {/* </div> */}
          </div>
        </div>
        <div className="col-8">
          <div className="card">
            <div className="card-header">
              <h3>Top 5 Doctors</h3>
            </div>
            <div className="card-body">
              <Table 
                headData= {latestOrders.header}
                renderHead={(item, index) => renderOrderHead(item, index)}
                bodyData = {latestOrders.body}
                renderBody={(item, index) => renderOrderBody(item, index)}/>
            </div>
            {/* <div className="card-footer"> */}
              {/* <Link to ='/'>View all</Link> */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
