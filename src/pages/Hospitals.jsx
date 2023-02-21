import React from 'react'
import Table from '../component/table/Table';
import hospitalsBeatList from '../assets/JsonData/hospitals-list.json'

const Hospitals = () => {

    const hospitalsTableHeader = [
        "",
        "name",
        "address",
      ];
    
      const renderHeader = (item, index) => <th key={index}>{item}</th>;
    
      const renderBody = (item, index) => (
        <tr key={index}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.address}</td>
        </tr>
      );
    
  return (
    <div>
      <h2 className="page-header">Doctors</h2>
      <div className="btn btn-add">
        <button>Add Hospital</button>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <Table
                limit="10"
                headData={hospitalsTableHeader}
                renderHead={(item, index) => renderHeader(item, index)}
                bodyData={hospitalsBeatList}
                renderBody={(item, index) => renderBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hospitals