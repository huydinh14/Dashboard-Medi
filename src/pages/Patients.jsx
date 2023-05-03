import React, { useEffect, useState } from "react";
import CustomTable from "../component/table/Table";
import patientApi from "../api/modules/patient.api";
import {
  Dropdown,
  Modal,
  Space,
  Tag,
  Table,
  Form,
  Input,
  InputNumber,
  Select,
  Radio,
  Button,
  Alert,
} from "antd";
import hospitalApi from "../api/modules/hospital.api";

const Patients = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [patientList, setPatientList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
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

  const onFinish = (patient) => {
    setErrorMessage(undefined);
    const newPatient = {
      name: patient.user.name,
      age: patient.user.age + "",
      phone: patient.user.phone,
      gender: patient.user.gender,
      CCCD: patient.user.CCCD,
      hospital_id: patient.user.Hospital_Id,
      status: false,
    };
    const fetchAddPatient = async () => {
      try {
        const { response, error } = await patientApi.addPatient(newPatient);
        if (response) {
          setIsModalOpen(false);
          form.resetFields();
          fetchPatientList();
          // setPatientList((prevPatientList) => [
          //   ...prevPatientList,
          //   response
          // ]);
        }
        if (error) {
          setErrorMessage(error.message);
        }
      } catch (error) {
        console.log("Failed to fetch patient list: ", error);
      }
    };
    fetchAddPatient();
  };
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    // Xóa row khỏi tableData
    if (patientList.length === 0) return;
    const newData = patientList.filter(
      (item) => !selectedRowKeys.includes(item.key)
    );
    setPatientList(newData);

    // Cập nhật lại selectedRowKeys
    setSelectedRowKeys([]);

    // Ẩn dialog xác nhận
    setIsModalVisible(false);
  };

  const handleDeleteCancel = () => {
    // Ẩn dialog xác nhận
    setIsModalVisible(false);
  };

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

  const patientColumn = [
    {
      title: "",
      dataIndex: "stt",
      key: "stt",
      width: "5%",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "auto",
      sorter: (a, b) => a.name.length - b.name.length,
      ellipsis: true,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (_, { gender }) => (
        <>
        {
          gender === 1 ? "Male" : "Female"
        }
        </>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "CMND/CCCD",
      dataIndex: "CCCD",
      key: "cmnd",
    },
    {
      title: "Hospital Name",
      dataIndex: ["hospital_id", "name"],
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

  const showModalAddPatient = () => {
    setIsModalOpen(true);
  };

  const fetchPatientList = async () => {
    const { response, error } = await patientApi.getAll();
    if (response) {
      setPatientList(response);
    }
    if (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchPatientList();
  }, []);

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
      <h2 className="page-header">Patients</h2>
      <div className="btn btn-add">
        <button onClick={showModalAddPatient}>Add Patients</button>
        {isModalOpen && (
          <Modal
            title="Add Patient"
            open={isModalOpen}
            onOk={handleOk}
            footer={null}
            onCancel={handleCancel}
          >
            <Form
              form={form}
              {...layout}
              name="Add Patient"
              onFinish={onFinish}
              style={{
                maxWidth: 600,
              }}
              validateMessages={validateMessages}
            >
              <Form.Item
                name={["user", "name"]}
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
                name={["user", "age"]}
                label="Age"
                rules={[
                  {
                    type: "number",
                    required: true,
                    min: 0,
                    max: 99,
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
              <Form.Item
                name={["user", "gender"]}
                label="Gender"
                rules={[
                  {
                    type: "radio",
                    required: true,
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value="1"> Male </Radio>
                  <Radio value="0"> Female </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name={["user", "phone"]}
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
                name={["user", "CCCD"]}
                label="CCCD"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input type="number" />
              </Form.Item>
              <Form.Item
                name={["user", "Hospital_Id"]}
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
              {/* <Form.Item
                name={["user", "Status"]}
                label="Status"
                rules={[
                  {
                    type: "radio",
                    required: true,
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value="true"> Active </Radio>
                  <Radio value="false"> InActive </Radio>
                </Radio.Group>
              </Form.Item> */}
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
                headData={patientTableHeader}
                renderHead={(item, index) => renderHeader(item, index)}
                bodyData={patientList}
                renderBody={(item, index) => renderBody(item, index)}
              /> */}
              <CustomTable
                columns={patientColumn}
                data={patientList}
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

export default Patients;
