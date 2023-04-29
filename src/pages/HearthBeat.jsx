import React, { useEffect, useState } from "react";
import Table from "../component/table/Table";
import hearthBeatList from "../assets/JsonData/hearthBeat-list.json";
import CustomTable from "../component/table/Table";
import { Tag } from "antd";
import hearthBeatApi from "../api/modules/hearthbeat.api";

const HearthBeat = () => {
  const hearthBeatIOTColumn = [
    {
      title: "",
      dataIndex: "stt",
      alight: "center",
      key: "stt",
      width: "10%",
    },
    {
      title: "Name",
      dataIndex: "name_device",
      key: "name_device",
      sorter: (a, b) => a.name.length - b.name.length,
      ellipsis: true,
    },
    {
      title: "Address Mac",
      dataIndex: "ip_mac",
      key: "ip_mac",
    },
    {
      title: "Hospital Name",
      dataIndex: ["hospital_id", "name"],
      key: "hospital_name",
    },
    {
      title: "Patient CCCD",
      dataIndex: "patient_cccd",
      key: "patient_cccd",
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      key: "status",
      render: (_, { status }) => (
        <>
          <Tag color={status ? "green" : "volcano"}>
            {status ? "Active" : "Inactive"}
          </Tag>
        </>
      ),
    },
  ];
  
  const [hearthBeatList, setHearthBeatList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { response } = await hearthBeatApi.getAllHB();
        console.log(response);
        setHearthBeatList(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="page-header">Hearth-Beats</h2>
      <div className="btn btn-add">
        <button>Add Hearth-Beat</button>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              {/* <Table
                limit= '10'
                headData={hearthBeatTableHeader}
                renderHead={(item, index) => renderHeader(item, index)}
                bodyData={hearthBeatList}
                renderBody={(item, index) => renderBody(item, index)}
              /> */}
              <CustomTable columns={hearthBeatIOTColumn} data={hearthBeatList} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HearthBeat;
