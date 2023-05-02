import React, { useEffect, useState } from "react";
import statusCards from "../assets/JsonData/status-card-data.json";
import StatusCard from "../component/status-card/StatusCard";
import Chart from "react-apexcharts";
import moment from "moment";
import CustomTable from "../component/table/Table";
import { Cascader, Space } from "antd";
import Loading from "../component/loading/Loading";
import { useSelector } from "react-redux";
import dashboardApi from "../api/modules/dashboard.api";
import { toast } from "react-toastify";
import WebSocketClient from "../socket/websocket";
import hearthBeatApi from "../api/modules/hearthbeat.api";

// Tính toán ngày đầu tiên và cuối cùng trong tuần gần nhất
const startOfWeek = moment().startOf("day").subtract(6, "days");
let xaxisCategories = [];
let currDate = moment(startOfWeek);
for (let i = 0; i < 7; i++) {
  xaxisCategories.push(currDate.format("DD/MM/YY"));
  currDate.add(1, "days");
}

const columnPatients = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Heartbeat (%)",
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
    name: "Hồ Văn Tùng",
    heartDiseasePercent: "80",
  },
  {
    key: "2",
    name: "Trần Văn Chiến",
    heartDiseasePercent: "75",
  },
  {
    key: "3",
    name: "Phạm Quang Chính",
    heartDiseasePercent: "72",
  },
  {
    key: "4",
    name: "Trần Thị Diễm My",
    heartDiseasePercent: "67",
  },
  {
    key: "5",
    name: "Nguyễn Vũ Lộc",
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
  const [data, setData] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  const [listIOT, setListIOT] = useState([]);
  const [ip_mac, setIp_mac] = useState("");

  const { user } = useSelector((state) => state.user);

  const [array1, setArray1] = useState([0, 0, 0, 0, 0, 0, 0]); // heartbeat
  const [array2, setArray2] = useState([0, 0, 0, 0, 0, 0, 0]); // spo2
  const [array3, setArray3] = useState([0, 0, 0, 0, 0, 0, 0]); // temperature

  const chartOptions = {
    series: [
      {
        name: "HearthBeat",
        data: array1,
      },
      {
        name: "Blood Pressure",
        data: array2,
      },
      {
        name: "Cholesterol",
        data: array3,
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

  const onChangeIOT = (value) => {
    setIp_mac(value);
  };

  useEffect(() => {
    const fetchDataChart = async () => {
      const { response } = await dashboardApi.getHeartRateChartWeek(ip_mac);
      setDataChart(response.beat_avgs);
    };
    fetchDataChart();
  }, [user, ip_mac]);

  useEffect(() => {
    if (dataChart && dataChart.length > 0) {
      let newAr1 = [...array1];
      let newAr2 = [...array2];
      let newAr3 = [...array3];
      dataChart.forEach((item) => {
        const dayTemp = item.date;
        let dayApi = dayTemp.substring(0, 6) + dayTemp.substring(8);
        const position = xaxisCategories.indexOf(dayApi);
        if (position !== -1) {
          newAr1.splice(position, 1, item.avg);
          newAr2.splice(position, 1, item.bp);
          newAr3.splice(position, 1, item.chol);
        }
      });
      setArray1(newAr1);
      setArray2(newAr2);
      setArray3(newAr3);
    }
  }, [dataChart]);

  const handleMessage = async (data) => {
    await setData(data.message);
  };

  const fetch_iot = async () => {
    const { response } = await hearthBeatApi.getAllHB();
    if(response) {
      const data = response.map((item) => {
        return {
          label: item.ip_mac,
          value: item.ip_mac,
        }
      })
      setListIOT(data);
    }
  }

  // useEffect(() => {
  //   //const socketCL = new WebSocketClient("ws://165.22.55.235:5000/");
  //   const socketCL = new WebSocketClient("ws://157.245.204.4:5000/");
  //   socketCL.connect();
  //   socketCL.addListener("warning", handleMessage);
  //   return () => {
  //     socketCL.removeListener("message", handleMessage);
  //     socketCL.disconnect();
  //   };
  // }, []);

  // useEffect(() => {
  //   if (data.length > 0) {
  //     const tempDB = statusCardsDB;
  //     const datas = data.split(",");
  //     setStatusCardsDB(
  //       tempDB.map((item, index) => {
  //         if (index > 2 && index < 6) {
  //           item.count = datas[0].toString();
  //           datas.shift();
  //           return item;
  //         }
  //         return item;
  //       })
  //     );
  //   }
  // }, [data]);

  useEffect(() => {
    if (user === null) return;
    if (user) {
      const fetchData = async () => {
        setLoading(true);
        const { response, err } = await dashboardApi.getDBCard(user);
        if (err) toast.error(err);
        //setStatusCardsDB([...statusCardsDB, ]);
        setTotalDashboard(response);
        setLoading(false);
      };
      fetchData();
      fetch_iot();
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
          </div>
          <h2 className="page-header">Dashboard</h2>
          <div className="row">
            <div className="col-5">
              <div className="row">
                {user?.isAdmin
                  ? statusCardsDB.map((item, index) => {
                      return (
                        <div className="col-6" key={index}>
                          <StatusCard
                            icon={item.icon}
                            count={item.count}
                            title={item.title}
                          />
                        </div>
                      );
                    })
                  : statusCardsDB.map((item, index) => {
                      return item.role === "user" ? (
                        <div className="col-6" key={index}>
                          <StatusCard
                            icon={item.icon}
                            count={item.count}
                            title={item.title}
                          />
                        </div>
                      ) : null;
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
            {user?.isAdmin ? (
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
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
