import React from 'react'
import Table from '../component/table/Table'
import hearthBeatList from '../assets/JsonData/hearthBeat-list.json'

const HearthBeat = () => {

    const hearthBeatTableHeader = [
        '',
        'name',
        'address-mac',
        'hospital',
        'status'
      ]
      
      const renderHeader = (item, index) => <th key={index}>{item}</th>
      
      const renderBody = (item, index) => (
        <tr key={index}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.address_mac}</td>
          <td>{item.hospital}</td>
          <td>{
            item.status === 'active' ? (
                <span className='badge bg-success'>{item.status}</span>
            ) : 
            (
                <span className='badge bg-danger'>{item.status}</span>
            )
          }</td>
        </tr>
      )

  return (
    <div>
        <h2 className='page-header'>
        Hearth-Beats
      </h2>
      <div className='btn btn-add'>
        <button>Add Hearth-Beat</button>
      </div>
      <div className='row'>
        <div className='col-12'>
          <div className='card'>
            <div className='card-body'>
              <Table
                limit= '10'
                headData={hearthBeatTableHeader}
                renderHead={(item, index) => renderHeader(item, index)}
                bodyData={hearthBeatList}
                renderBody={(item, index) => renderBody(item, index)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HearthBeat