import React from "react";
import Table from "../component/table/Table";
import pathogensBeatList from "../assets/JsonData/pathogens-list.json";
import CustomTable from "../component/table/Table";

const Pathogens = () => {
  const pathogensTableHeader = [
    "",
    "name",
    "description",
  ];

  const pathogenColumn = [
    {
      title: "",
      dataIndex: "stt",
      key: "stt",
      alight: "center",
      width: "10%",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ]

  const dataPathogen = [
    {
      key: "1",
      stt: "1",
      "name": "COVID-19",
      description: "Coronavirus disease 2019 (COVID-19) is an infectious disease caused by severe acute respiratory syndrome coronavirus 2 (SARS-CoV-2).",
    },
    {
      key: "2",
      stt: "2",
      "name": "SARS",
      description: "Severe acute respiratory syndrome (SARS) is a viral respiratory disease of zoonotic origin caused by the SARS coronavirus (SARS-CoV).",
    },
    {
      key: "3",
      stt: "3",
      "name": "MERS",
      description: "Middle East respiratory syndrome (MERS) is a viral respiratory disease of zoonotic origin caused by the MERS coronavirus (MERS-CoV).",
    },
    {
      key: "4",
      stt: "4",
      "name": "HIV",
      description: "Human immunodeficiency virus (HIV) is a lentivirus (a subgroup of retrovirus) that causes HIV infection and over time acquired immunodeficiency syndrome (AIDS).",
    },
  ]

  return (
    <div>
      <h2 className="page-header">Pathogens</h2>
      <div className="btn btn-add">
        <button>Add Pathogen</button>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              {/* <Table
                limit="10"
                headData={pathogensTableHeader}
                renderHead={(item, index) => renderHeader(item, index)}
                bodyData={pathogensBeatList}
                renderBody={(item, index) => renderBody(item, index)}
              /> */}
              <CustomTable columns={pathogenColumn} data={dataPathogen}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pathogens;
