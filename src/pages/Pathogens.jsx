import React from "react";
import Table from "../component/table/Table";
import pathogensBeatList from "../assets/JsonData/pathogens-list.json";

const Pathogens = () => {
  const pathogensTableHeader = [
    "",
    "name",
    "description",
    "conditions_rule_name",
  ];

  const renderHeader = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.description}</td>
      <td>{item.Conditions_Rule_Name}</td>
    </tr>
  );

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
              <Table
                limit="10"
                headData={pathogensTableHeader}
                renderHead={(item, index) => renderHeader(item, index)}
                bodyData={pathogensBeatList}
                renderBody={(item, index) => renderBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pathogens;
