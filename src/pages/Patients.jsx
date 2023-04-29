import React, { useEffect, useState } from "react";
import Table from "../component/table/Table";
import patientList from "../assets/JsonData/patients-list.json";
import CustomTable from "../component/table/Table";
import patientApi from "../api/modules/patient.api";
import { Tag } from "antd";

const Patients = () => {

  const patientColumn = [
    {
      title: "",
      dataIndex: "stt",
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
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "CMND/CCCD",
      dataIndex: "cmnd",
      key: "cmnd",
    },
    {
      title: "Hospital Name",
      dataIndex: "hospitalName",
      key: "hospitalName",
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

  const dataPatients = [
    {
      key: "1",
      stt: "1",
      name: "Quan Vu",
      age: "22",
      phone: "03221654154",
      cmnd: "8265151515151",
      hospitalName: "Bach Mai",
      status: true,
    },
    {
      key: "2",
      stt: "2",
      name: "Luu Bi",
      age: "22",
      phone: "0909512145",
      cmnd: "15615616516151",
      hospitalName: "Bach Mai",
      status: true,
    },
    {
      key: "3",
      stt: "3",
      name: "Tao Thao",
      age: "22",
      phone: "02225454545",
      cmnd: "12121212121211",
      hospitalName: "Bach Mai",
      status: false,
    },
  ];

  const [patientList, setPatientList] = useState([dataPatients]);

  useEffect(() => {
    const fetchPatientList = async () => {
      const { response, error } = await patientApi.getAll();
      if (response) {
        setPatientList(response);
      }
      if (error) {
        console.log(error);
      }
    };
    fetchPatientList();
  }, []);

  return (
    <div>
      <h2 className="page-header">Patients</h2>
      <div className="btn btn-add">
        <button>Add Patients</button>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              {/* <Table
                limit= '10'
                headData={patientTableHeader}
                renderHead={(item, index) => renderHeader(item, index)}
                bodyData={patientList}
                renderBody={(item, index) => renderBody(item, index)}
              /> */}
              <CustomTable columns={patientColumn} data={patientList} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patients;
