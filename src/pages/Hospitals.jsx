import React from 'react'
import Table from '../component/table/Table';
import hospitalsBeatList from '../assets/JsonData/hospitals-list.json'
import CustomTable from '../component/table/Table';

const Hospitals = () => {

    const hospitalColumn = [
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
            title: "Address",
            dataIndex: "address",
            key: "address",
        },
        {
            title: "Phone",
            dataIndex: "phone",
            key: "phone",
        }
    ]
    
    const dataHospital = [
      {
        key: "1",
        stt: "1",
        name: "Bệnh viện Đa khoa Hà Nội",
        address: "Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội",
        phone: "024 125444",
      },
      {
        key: "2",
        stt: "2",
        name: "Bệnh viện Gia Định",
        address: "Số 1 Nơ Trang Long, Gò Vấp, Hồ Chí Minh",
        phone: "028 000888",
      }
      ,
      {
        key: "3",
        stt: "3",
        name: "Bệnh viện 175",
        address: "Số 1 Quang Trung, Gò Vấp, Hồ Chí Minh",
        phone: "028 000999",
      }
    ]

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
              {/* <Table
                limit="10"
                headData={hospitalsTableHeader}
                renderHead={(item, index) => renderHeader(item, index)}
                bodyData={hospitalsBeatList}
                renderBody={(item, index) => renderBody(item, index)}
              /> */}
              <CustomTable columns={hospitalColumn} data={dataHospital}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hospitals