import React, { useEffect, useState } from "react";
import CustomTable from "../component/table/Table";
import {
  Alert,
  Button,
  Dropdown,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
  Space,
  Table,
} from "antd";
import doctorApi from "../api/modules/doctor.api";
import Loading from "../component/loading/Loading";
import hospitalApi from "../api/modules/hospital.api";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

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
    dataIndex: ["hospital_id", "name"],
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

const Doctor = () => {
  const [dataDoctor, setDataDoctor] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [hospitalList, setHospitalList] = useState([]);
  const [form] = Form.useForm();

  const { Option } = Select;

  const validateMessages = {
    required: "${label} is required!",
    types: {
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const onFinish = (doctorNew) => {
    setErrorMessage(undefined);
    const fetchAddDoctor = async () => {
      try {
        const { response, error } = await doctorApi.addDoctor(doctorNew);
        if (response) {
          setIsModalOpen(false);
          form.resetFields();
          fetchAllDoctor();
        }
        if (error) {
          setErrorMessage(error.message);
        }
      } catch (error) {
        console.log("Failed to fetch patient list: ", error);
      }
    };
    fetchAddDoctor();
  };

  useEffect(() => {
    const getSpecialist = async () => {
      try {
        const { response } = await doctorApi.getDoctor();
        const specialistList = response.map((item) => {
          return {
            text: item,
            value: item,
          };
        });
        columnDoctor[3].filters = specialistList;
      } catch (error) {
        console.log("Failed to fetch specialist list: ", error);
      }
    };
    getSpecialist();
  }, []);

  const fetchAllDoctor = async () => {
    try {
      const { response } = await doctorApi.getAllDoctor();
      setDataDoctor(response);
    } catch (error) {
      console.log("Failed to fetch doctor list: ", error);
    }
  };

  useEffect(() => {
    fetchAllDoctor();
  }, []);

  const handleRowSelection = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleDelete = () => {
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

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModalAddPatient = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (!isModalOpen) return;
    const fetchHospitalList = async () => {
      try {
        const { responseHospital } = await hospitalApi.getAllCbb();
        setHospitalList(responseHospital);
      } catch (error) {
        console.log("Failed to fetch hospital list: ", error);
      }
    };
    fetchHospitalList();
  }, [isModalOpen]);

  return (
    <div>
      <h2 className="page-header">Doctors</h2>
      <div className="btn btn-add">
        <button onClick={showModalAddPatient}>Add Doctor</button>
        {isModalOpen && (
          <Modal
            title="Add Doctor"
            open={isModalOpen}
            onOk={handleOk}
            footer={null}
            onCancel={handleCancel}
          >
            <Form
              form={form}
              {...layout}
              name="Add Doctor"
              onFinish={onFinish}
              style={{
                maxWidth: 600,
              }}
              validateMessages={validateMessages}
            >
              <Form.Item
                name={["doctor", "name"]}
                label="Name"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["doctor", "phone"]}
                label="Phone"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                name={["doctor", "specialist"]}
                label="Specialist"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["doctor", "email"]}
                label="Email"
                rules={[
                  {
                    type: "email",
                    required: true,
                  },
                ]}
              >
                <Input type="Email" />
              </Form.Item>
              <Form.Item
                name={["doctor", "Hospital_Id"]}
                label="Hospital Name"
                rules={[
                  {
                    type: "text",
                    required: true,
                  },
                ]}
              >
                <Select>
                  {hospitalList?.map((option, index) => (
                    <Option key={index} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  ...layout.wrapperCol,
                  offset: 8,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
              {errorMessage && (
                <Form.Item>
                  <Alert
                    message={errorMessage}
                    type="error"
                    showIcon
                    closable
                  />
                </Form.Item>
              )}
            </Form>
          </Modal>
        )}
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
