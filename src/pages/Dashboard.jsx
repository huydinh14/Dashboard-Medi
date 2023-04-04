import React, { useEffect, useState } from "react";
import statusCards from "../assets/JsonData/status-card-data.json";
import StatusCard from "../component/status-card/StatusCard";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import Table from "../component/table/Table";
import moment from "moment";
import CustomTable from "../component/table/Table";
import { Space } from "antd";
import axios from "axios";
import apiCall from "../api/apiCall";
import Loading from "../component/loading/Loading";
import { useSelector, useDispatch } from "react-redux";

// Tính toán ngày đầu tiên và cuối cùng trong tuần gần nhất
const startOfWeek = moment().startOf("week");
const endOfWeek = moment().endOf("week");

// Tạo một mảng các đối tượng ngày để cấu hình x-axis
let xaxisCategories = [];
const data = [];
let currDate = moment(startOfWeek);
while (currDate <= endOfWeek) {
  xaxisCategories.push(currDate.format("DD/MM/YYYY"));
  data.push(Math.floor(Math.random() * 10) + 1);
  currDate.add(1, "days");
}

const chartOptions = {
  series: [
    {
      name: "Online Customers",
      data: data,
    },
  ],
  options: {
    title: {
      text: "Heart Rate Chart",
      align: "center",
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        fontFamily: undefined,
        color: "#263238",
      },
    },
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
      categories: xaxisCategories,
    },
    legend: {
      position: "top",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
  },
};

const columnPatients = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Heart Disease (%)",
    dataIndex: "heartDiseasePercent",
    key: "heartDiseasePercent",
    align: "center",
  },
  {
    title: "Detail",
    key: "detail",
    render: (_, record) => (
      <Space size="middle">
        <a style={{ color: "blue" }}>Detail</a>
      </Space>
    ),
  },
];

const dataCondition = [
  {
    key: "1",
    name: "Luu Bi",
    heartDiseasePercent: "80",
  },
  {
    key: "2",
    name: "Quan Vu",
    heartDiseasePercent: "75",
  },
  {
    key: "3",
    name: "Tao Thao",
    heartDiseasePercent: "72",
  },
  {
    key: "4",
    name: "Truong Phi",
    heartDiseasePercent: "67",
  },
  {
    key: "5",
    name: "Chu Du",
    heartDiseasePercent: "50",
  },
];

const columnHospital = [
  {
    title: "Hospital Id",
    dataIndex: "hospitalId",
    key: "hospitalId",
  },
  {
    title: "Hospital Name",
    dataIndex: "hospitalName",
    key: "hospitalName",
  },
  {
    title: "Total Device",
    dataIndex: "totalDevice",
    key: "totalDevice",
    align: "center",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    align: "center",
  },
];

const dataTopHospital = [
  {
    key: "1",
    hospitalId: "#HS1711",
    hospitalName: "BV Binh Dan",
    totalDevice: "490",
    date: "27 Jun 2023",
  },
  {
    key: "2",
    hospitalId: "#HS1712",
    hospitalName: "BV Binh Thanh",
    totalDevice: "250",
    date: "27 Jun 2023",
  },
  {
    key: "3",
    hospitalId: "#HS1713",
    hospitalName: "BV Binh Tan",
    totalDevice: "120",
    date: "27 Jun 2023",
  },
  {
    key: "4",
    hospitalId: "#HS1714",
    hospitalName: "BV Binh Chanh",
    totalDevice: "110",
    date: "27 Jun 2023",
  },
  {
    key: "5",
    hospitalId: "#HS1715",
    hospitalName: "BV Binh Phuoc",
    totalDevice: "80",
    date: "27 Jun 2023",
  },
];

const Dashboard = () => {
  const [statusCardsDB, setStatusCardsDB] = useState(statusCards);
  const [totalDashBoard, setTotalDashboard] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => state.user);

  // useEffect(() => {
  //   setLoading(true);
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 800);
  // }, []);

  useEffect(() => {
    if(user === null) return;
    if (user) {
      const fetchData = async () => {
        setLoading(true);
        const res = await axios.get(apiCall + "dashboard/get_db_card");
        //setStatusCardsDB([...statusCardsDB, ]);
        setTotalDashboard(res.data);
        setLoading(false);
      };
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    const updateDate = async () => {
      const tempDB = statusCardsDB;
      setStatusCardsDB(
        tempDB.map((item, index) => {
          item.count = totalDashBoard[index]?.toString();
          return item;
        })
      );
    };
    updateDate();
  }, [JSON.stringify(totalDashBoard)]);
  
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <h2 className="page-header">Dashboard</h2>
          <div className="row">
            <div className="col-5">
              <div className="row">
                {statusCardsDB.map((item, index) => {
                  return (
                    <div className="col-6" key={index}>
                      <StatusCard
                        icon={item.icon}
                        count={item.count}
                        title={item.title}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="col-7">
              <div className="card full-height">
                <Chart
                  options={chartOptions.options}
                  series={chartOptions.series}
                  type="line"
                  height="100%"
                />
              </div>
            </div>
            {
              user?.isAdmin ? (
                <>
                <div className="col-5">
              <div className="card">
                <div className="card-header">
                  <h3>Top 5 Patients</h3>
                </div>
                <div className="card-body-cus">
                  {/* <Table 
                headData= {topConditionRules.head}
                renderHead={(item, index) => renderCusomerHead(item, index)}
                bodyData = {topConditionRules.body}
                renderBody={(item, index) => renderCusomerBody(item, index)}/> */}
                  <CustomTable
                    columns={columnPatients}
                    data={dataCondition}
                    pagination={false}
                  />
                </div>
                {/* <div className="card-footer"> */}
                {/* <Link to ='/'>View all</Link> */}
                {/* </div> */}
              </div>
            </div>
            <div className="col-7">
              <div className="card">
                <div className="card-header">
                  <h3>Top 5 Top Hopspital</h3>
                </div>
                <div className="card-body">
                  {/* <Table 
                headData= {latestOrders.header}
                renderHead={(item, index) => renderOrderHead(item, index)}
                bodyData = {latestOrders.body}
                renderBody={(item, index) => renderOrderBody(item, index)}/> */}
                  <CustomTable
                    columns={columnHospital}
                    data={dataTopHospital}
                    pagination={false}
                  />
                </div>
                {/* <div className="card-footer"> */}
                {/* <Link to ='/'>View all</Link> */}
                {/* </div> */}
              </div>
            </div>
                </>
              )
              : (
              <></>
            )
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
