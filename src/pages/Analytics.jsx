// import React, { useEffect, useState } from "react";
// import Chart from "react-apexcharts";
// import moment from "moment";
// import statisticApi from "../api/modules/statistic.api";
// import { Cascader, DatePicker } from "antd";
// import WebSocketClient from "../socket/websocket";
// import hearthBeatApi from "../api/modules/hearthbeat.api";

// const Analytics = () => {
//   const [message, setMessage] = useState([]);
//   const [data, setData] = useState("");
//   const [listIOT, setListIOT] = useState([]);
//   const [ip_mac, setIp_mac] = useState("");

//   const chartOptions1 = {
//     series: [
//       {
//         name: "Heartbeat",
//         data: message,
//       },
//     ],
//     options: {
//       chart: {
//         height: 350,
//         type: "line",
//         zoom: {
//           enabled: false,
//         },
//       },
//       dataLabels: {
//         enabled: false,
//       },
//       stroke: {
//         curve: "straight",
//       },
//       title: {
//         text: "Realtime Heartbeat",
//         align: "left",
//       },
//       grid: {
//         row: {
//           colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
//           opacity: 0.5,
//         },
//       },
//       xaxis: {
//         type: "datetime",
//       },
//     },
//   };

//   const handleMessage = async (data) => {
//     console.log("🚀 ~ file: Analytics.jsx:67 ~ handleMessage ~ data:", data);
//     await setData(data.message);
//   };

//   const fetch_iot = async () => {
//     const { response } = await hearthBeatApi.getAllHB();
//     if (response) {
//       const data = response.map((item) => {
//         return {
//           label: item.ip_mac,
//           value: item.ip_mac,
//         };
//       });
//       setListIOT(data);
//     }
//   };

//   useEffect(() => {
//     fetch_iot();
//   }, []);

//   useEffect(() => {
//     //const socketLink = "ws://157.245.204.4:5000";
//     const socketLink = "ws://localhost:5000";
//     const socketCL = new WebSocketClient(socketLink);
//     socketCL.connect();
//     socketCL.addListener("warning", handleMessage);
//     return () => {
//       socketCL.removeListener("message", handleMessage);
//       socketCL.disconnect();
//     };
//   }, []);

//   const onChangeIOT = (value) => {
//     setIp_mac(value);
//   };

//   useEffect(() => {
//     const filter = data.split(",");
//     if(filter[0] === ip_mac) {
//       setMessage((prev) => [...prev, filter[1]]);
//     }
//   }, [data]);

//   return (
//     <div id="chart">
//       <div className="analytic_cbb">
//         <Cascader
//           style={{
//             width: "25%",
//           }}
//           status="error"
//           options={listIOT}
//           onChange={onChangeIOT}
//           placeholder="Choose device"
//           maxTagCount="responsive"
//         />
//       </div>
//       <h2 className="page-header">Analytics</h2>
//       <div id="realtime-container">
//         <div id="chart">
//           <Chart
//             options={chartOptions1.options}
//             series={chartOptions1.series}
//             type="line"
//             height={500}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Analytics;

import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import moment from "moment";
import { webSocketClient } from "../socket/websocket";
import { Cascader, DatePicker } from "antd";
import hearthBeatApi from "../api/modules/hearthbeat.api";
import { toast } from "react-toastify";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [series, setSeries] = useState([{ data: [] }]);
  const [listIOT, setListIOT] = useState([]);
  const [ip_mac, setIp_mac] = useState("");
  const [statusToast, setStatusToast] = useState(false);
  const [options, setOptions] = useState({
    chart: {
      id: "realtime",
      height: 350,
      type: "line",
      animations: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      text: "Realtime Heartbeat Chart",
      align: "center",
    },
    markers: {
      size: 0,
    },
    xaxis: {
      type: "datetime",
      labels: {
        formatter: (value) => {
          return moment(value).format("HH:mm:ss");
        },
      },
    },
    yaxis: {},
    legend: {
      show: false,
    },
  });

  const handleMessage = (message) => {
    const newData = message.message.split(",");
    if (newData[0] === ip_mac) {
        setData(newData);
    }
  };

  const onChangeIOT = (value) => {
    setIp_mac(value[0]);
  };

  useEffect(() => {
    if (statusToast) {
      toast.success(`Heartbeat: ${data[0]} Connected`, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 3000,
      });
      setStatusToast(false);
    }
  }, [statusToast]);

  useEffect(() => {
    webSocketClient.addListener("warning", handleMessage);
    return () => {
      webSocketClient.removeListener("warning", handleMessage);
    };
  }, []);

  // useEffect(() => {
  //   const newTime = Date.now();
  //   const y = Number(data[1]);
  //   console.log("🚀 ~ file: Analytics.jsx:204 ~ useEffect ~ y:", y)
  //   setSeries((prevSeries) => {
  //     const newSeries = [...prevSeries[0].data, { x: newTime, y }];
  //     return [{ data: newSeries.slice(-10) }];
  //   });
  // }, [data]);

  useEffect(() => {
    const newTime = Date.now();
    const y = Number(data[1]);
    setSeries((prevSeries) => {
      const newSeries = [...prevSeries[0].data, { x: newTime, y }];
      return [{ data: newSeries.slice(-10) }];
    });
  }, [data]);

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

  return (
    <div id="chart">
      <div className="analytic_cbb">
        <Cascader
          style={{
            width: "25%",
          }}
          status="error"
          options={listIOT}
          onChange={onChangeIOT}
          placeholder="Choose device"
          maxTagCount="responsive"
        />
      </div>
      <Chart options={options} series={series} type="line" height={500} />
    </div>
  );
};

export default Analytics;
