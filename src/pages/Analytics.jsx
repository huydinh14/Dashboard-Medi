import React, { useEffect, useState } from "react";
import { Cascader } from "antd";

const options = [
    {
      value: "48:3F:DA:4E:92:B8",
      label: "HBEAT483FDA4E92B8",
    },
];

const Analytics = () => {
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const iframe = document.createElement('iframe');
  //   iframe.src = 'http://192.168.1.5/real_time';
  //   iframe.onload = () => {
  //     setIsLoading(false);
  //   };
  //   document.getElementById('realtime-container').appendChild(iframe);
  // }, []);
  const onChange = (value) => {
    console.log(value);
  };

  return (
    <div id="chart">
    <div className="analytic_cbb">
          <Cascader
            style={{
              width: "25%",
            }}
            status="error"
            options={options}
            onChange={onChange}
            placeholder="Choose device"
            maxTagCount="responsive"
            value={["48:3F:DA:4E:92:B8"]}
          />
        </div>
      <h2 className="page-header">
        Analytics
      </h2>
      <div id="realtime-container">
        {/* {isLoading ? (
        <div>Loading...</div>
      ) : null} */}
        <iframe
          src="http://192.168.1.6/real_time"
          width="100%"
          height="500"
        ></iframe>
      </div>
    </div>
  );
};

export default Analytics;
