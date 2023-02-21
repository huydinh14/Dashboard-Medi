import React from 'react'
import Table from '../component/table/Table'
import patientList from '../assets/JsonData/patients-list.json'

const Patients = () => {

    const patientTableHeader = [
        '',
        'Name',
        "age",
        'Email',
        'Phone',
        'CMND/CCCD',
        'Detail',
      ]
      
      const renderHeader = (item, index) => <th key={index}>{item}</th>
      
      const renderBody = (item, index) => (
        <tr key={index}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.age}</td>
          <td>{item.email}</td>
          <td>{item.phone}</td>
          <td>{item.cccd}</td>
          <td>
          <span className='badge bg-success'>Detail</span>
          </td>
        </tr>
      )

  return (
    <div>
       <h2 className='page-header'>
        Patients
      </h2>
      <div className='btn btn-add'>
        <button>Add Patients</button>
      </div>
      <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              <Table
                limit= '10'
                headData={patientTableHeader}
                renderHead={(item, index) => renderHeader(item, index)}
                bodyData={patientList}
                renderBody={(item, index) => renderBody(item, index)}
              />
            </div>
          </div>
        </div>
    </div>
  )
}

export default Patients