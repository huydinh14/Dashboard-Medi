import React, { useEffect, useState } from "react";
import Table from "../component/table/Table";
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
  Tag,
} from "antd";
import hearthBeatApi from "../api/modules/hearthbeat.api";

const HearthBeat = () => {
  const hearthBeatIOTColumn = [
    {
      title: "",
      dataIndex: "stt",
      alight: "center",
      key: "stt",
      width: "10%",
    },
    {
      title: "Name",
      dataIndex: "name_device",
      key: "name_device",
      sorter: (a, b) => a.name.length - b.name.length,
      ellipsis: true,
    },
    {
      title: "Address Mac",
      dataIndex: "ip_mac",
      key: "ip_mac",
    },
    {
      title: "Hospital Name",
      dataIndex: ["hospital_id", "name"],
      key: "hospital_name",
    },
    {
      title: "Patient CCCD",
      dataIndex: "patient_cccd",
      key: "patient_cccd",
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

  const [hearthBeatList, setHearthBeatList] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
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

  const onFinish = (heartbeat) => {
    setErrorMessage(undefined);
    const newHearthBeat = {
      name: heartbeat.user.name,
      age: heartbeat.user.age + "",
      phone: heartbeat.user.phone,
      gender: heartbeat.user.gender,
      CCCD: heartbeat.user.CCCD,
      hospital_id: heartbeat.user.Hospital_Id,
      status: false,
    };
    const fetchAddPatient = async () => {
      try {
        const { response, error } = await hearthBeatApi.addPatient(
          newHearthBeat
        );
        if (response) {
          setIsModalOpen(false);
          form.resetFields();
          fetchData();
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

  const showModalAddPatient = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    // Xóa row khỏi tableData
    if (hearthBeatList.length === 0) return;
    const newData = hearthBeatList.filter(
      (item) => !selectedRowKeys.includes(item.key)
    );
    setHearthBeatList(newData);

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

  const fetchData = async () => {
    try {
      const { response } = await hearthBeatApi.getAllHB();
      console.log(response);
      setHearthBeatList(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="page-header">Hearth-Beats</h2>
      <div className="btn btn-add">
        <button onClick={showModalAddPatient}>Add Hearth-Beat</button>
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
                name={["hb", "name"]}
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
                name={["hb", "age"]}
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
                name={["hb", "gender"]}
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
                name={["hb", "phone"]}
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
                name={["hb", "CCCD"]}
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
                name={["hb", "Hospital_Id"]}
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
              <CustomTable
                columns={hearthBeatIOTColumn}
                data={hearthBeatList}
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

export default HearthBeat;
