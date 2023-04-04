import React from "react";
import Table from "../component/table/Table";
import hearthBeatList from "../assets/JsonData/hearthBeat-list.json";
import CustomTable from "../component/table/Table";
import { Tag } from "antd";

const HearthBeat = () => {
  const hearthBeatTableHeader = [
    "",
    "name",
    "address-mac",
    "hospital_id",
    "patient_cccd",
    "status",
  ];

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
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ellipsis: true,
    },
    {
      title: "Address Mac",
      dataIndex: "address-mac",
      key: "address-mac",
    },
    {
      title: "Hospital ID",
      dataIndex: "hospital_id",
      key: "hospital_id",
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
          <Tag color={status ? 'green' : 'volcano'}>
            {status ? 'Active' : 'Inactive'}
          </Tag>
        </>
      ),
    }
  ];

  const dataHbIOT = [
    {
      key: "1",
      stt: "1",
      name: "	HBeat-MH370",
      "address-mac": "DB-BA-CB-13-HG-34",
      hospital_id: "1",
      patient_cccd: "055245457888",
      status: true,
    },
    {
      key: "2",
      stt: "2",
      name: "HBeat-MH371",
      "address-mac": "DB-BA-CB-13-HG-35",
      hospital_id: "1",
      patient_cccd: "0522656565555",
      status: true,
    }
  ]

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
              <CustomTable columns={hearthBeatIOTColumn} data={dataHbIOT} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HearthBeat;
