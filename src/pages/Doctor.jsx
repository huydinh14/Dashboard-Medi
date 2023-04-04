import React, { useEffect, useState } from "react";
import CustomTable from "../component/table/Table";
import { Dropdown, Menu, Modal, Space, Table } from "antd";
import axios from "axios";
import apiCall from "../api/apiCall";

const items = [
  {
    key: "1",
    label: "Edit",
  },
  {
    key: "2",
    label: "Delete",
  },
];

const columnDoctor = [
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
    ellipsis: "true",
  },
  {
    title: "Phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Specialist",
    dataIndex: "specialist",
    key: "specialist",
    filters: [],
    filterMode: "tree",
    filterSearch: true,
    onFilter: (value, record) => record.name.startsWith(value),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Hospital Name",
    dataIndex: "hospitalName",
    key: "hospitalName",
  },
  {
    title: "Action",
    dataIndex: "operation",
    alight: "center",
    key: "operation",
    render: () => (
      <Space size="middle">
        <Dropdown
          menu={{
            items,
          }}
          >
          <a>
            More <i className="bx bx-chevron-down"></i>
          </a>
        </Dropdown>
      </Space>
    ),
  },
];
const dataDoctorTemp = [
  {
    key: "1",
    stt: "1",
    name: "Nguyen Van A",
    phone: "0123456789",
    specialist: "Heart",
    email: "a@gmail.com",
    hospitalName: "Bach Mai",
  },
  {
    key: "2",
    stt: "2",
    name: "Nguyen Van B",
    phone: "0123456789",
    specialist: "Heart",
    email: "b@gmail.com",
    hospitalName: "Bach Mai",
  },
  {
    key: "3",
    stt: "3",
    name: "Nguyen Van C",
    phone: "0123456789",
    specialist: "Heart",
    email: "c@gmail.com",
    hospitalName: "Bach Mai",
  },
];

const Doctor = () => {
  //const [specialist, setSpecialist] = useState('');
  //const [filters, setFilters] = useState([]);
  const [dataDoctor, setDataDoctor] = useState(dataDoctorTemp);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const getSpecialist = async () => {
      try {
        const response = await axios.get(apiCall + "doctor/get_doctor");
        const specialistList = response.data.map((item) => {
          return {
            text: item,
            value: item,
          };
        });
        //setFilters(specialistList);
        columnDoctor[3].filters = specialistList;
      } catch (error) {
        console.log("Failed to fetch specialist list: ", error);
      }
    };
    getSpecialist();
  }, []);

  const handleRowSelection = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleDelete = () => {
    //setDeleteTarget();
    setIsModalVisible(true);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: handleRowSelection,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_NONE,
      {
        key: "deleteItemSelected",
        text: "Delete Selected",
        onSelect: handleDelete,
      },
    ],
  };

  const handleDeleteConfirm = () => {
    // Xóa row khỏi tableData
    if (dataDoctor.length === 0) return;
    const newData = dataDoctor.filter(
      (item) => !selectedRowKeys.includes(item.key)
    );
    setDataDoctor(newData);

    // Cập nhật lại selectedRowKeys
    setSelectedRowKeys([]);

    // Ẩn dialog xác nhận
    setIsModalVisible(false);
  };

  const handleDeleteCancel = () => {
    // Ẩn dialog xác nhận
    setIsModalVisible(false);
  };

  return (
    <div>
      <h2 className="page-header">Doctors</h2>
      <div className="btn btn-add">
        <button>Add Doctor</button>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              {/* <Table 
                limit= '10'
                headData={doctorsTableHeader}
                renderHead={(item, index) => renderHeader(item, index)}
                bodyData={customerList}
                renderBody={(item, index) => renderBody(item, index)}
              /> */}
              <CustomTable
                columns={columnDoctor}
                data={dataDoctor}
                rowSelection={rowSelection}
                rowKey={(record) => record.key}
              />
              <Modal
                title="Confirm Delete"
                open={isModalVisible}
                onOk={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
              >
                <p>Are you sure to delete items selected !?</p>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctor;
