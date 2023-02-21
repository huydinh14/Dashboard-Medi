import React from 'react'
import Table from '../component/table/Table'
import customerList from '../assets/JsonData/doctors-list.json'

const doctorsTableHeader = [
  '',
  'Name',
  'Email',
  'Phone',
  'Total Orders',
  'Total Spent',
  'Location',
]

const renderHeader = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.name}</td>
    <td>{item.email}</td>
    <td>{item.phone}</td>
    <td>{item.total_orders}</td>
    <td>{item.total_spend}</td>
    <td>{item.location}</td>
  </tr>
)

const Doctor = () => {
  return (
    <div>
      <h2 className='page-header'>
        Doctors
      </h2>
      <div className='btn btn-add'>
        <button>Add Doctor</button>
      </div>
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              <Table 
                limit= '10'
                headData={doctorsTableHeader}
                renderHead={(item, index) => renderHeader(item, index)}
                bodyData={customerList}
                renderBody={(item, index) => renderBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Doctor