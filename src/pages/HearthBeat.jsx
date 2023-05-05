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
import patientApi from "../api/modules/patient.api";
import hospitalApi from "../api/modules/hospital.api";
import EditForm from "../component/editForm/EditForm";
import { toast } from "react-toastify";

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
      render: (patientCccd) => (
        <div>
          <p>{patientCccd?.name}</p>
          <p>{patientCccd?.CCCD}</p>
        </div>
      ),
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
  const [patients, setPatients] = useState([]);
  const [form] = Form.useForm();
  const [statusDoctorDetail, setStatusDoctorDetail] = useState(false);
  const [itemDetail, setItemDetail] = useState({});

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
    const fetchAddHB = async () => {
      try {
        const { response, error } = await hearthBeatApi.addHB(heartbeat.hb);
        if (response) {
          setIsModalOpen(false);
          form.resetFields();
          fetchData();
        }
        if (error) {
          setErrorMessage(error.message);
        }
      } catch (error) {
        console.log("Failed to fetch patient list: ", error);
      }
    };
    fetchAddHB();
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

  const handleCloseDetailItem = () => {
    setStatusDoctorDetail(false);
    fetchData();
  };

  const handleDeleteConfirm = async () => {
    // Xóa row khỏi tableData
    if (hearthBeatList.length === 0) return;
    const newData = hearthBeatList.filter(
      (item) => !selectedRowKeys.includes(item.key)
    );
    const itemDelete = hearthBeatList
      .filter((item) => selectedRowKeys.includes(item.key))
      .map((item) => item._id);
    setHearthBeatList(newData);

    // Xóa row khỏi database
    const { response } = await hearthBeatApi.deleteHB(itemDelete);
    if (response) {
      toast.success(`Delete Success!`, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
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
      key: selectedRowKeys,
      label: "Edit",
      onClick: async (itemSelect) => {
        const getItemSelect = hearthBeatList.find(
          (item) => item.key === parseInt(itemSelect.key)
        );
        await setItemDetail(getItemSelect);
        await setStatusDoctorDetail(true);
      },
    },
  ];

  const fetchData = async () => {
    try {
      const { response } = await hearthBeatApi.getAllHB();
      setHearthBeatList(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const { response } = await patientApi.getPatientInActive();
        setPatients(response);
      } catch (error) {
        console.log("Failed to fetch patient list: ", error);
      }
    };
    const fetchHospital = async () => {
      const { responseHospital } = await hospitalApi.getAllCbb();
      setHospitalList(responseHospital);
    };
    fetchHospital();
    fetchData();
    fetchPatients();
  }, []);

  return (
    <div>
      <h2 className="page-header">HearthBeat-IOTs</h2>
      <div className="btn btn-add">
        <button onClick={showModalAddPatient}>Add HearthBeat-IOT</button>
        {isModalOpen && (
          <Modal
            title="Add HearthBeat-IOT"
            open={isModalOpen}
            onOk={handleOk}
            footer={null}
            onCancel={handleCancel}
          >
            <Form
              form={form}
              {...layout}
              name="Add HearthBeat-IOT"
              onFinish={onFinish}
              style={{
                maxWidth: 600,
              }}
              validateMessages={validateMessages}
            >
              <Form.Item
                name={["hb", "name_device"]}
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
                name={["hb", "ip_mac"]}
                label="IP_MAC"
                rules={[
                  {
                    required: true,
                  },
                  {
                    pattern: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,
                    message: "Invalid MAC Address, systax: XX:XX:XX:XX:XX:XX",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["hb", "hospital_id"]}
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
              <Form.Item name={["hb", "patient_cccd"]} label="Patient">
                <Select>
                  {patients?.map((option, index) => (
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
              <CustomTable
                columns={hearthBeatIOTColumn}
                data={hearthBeatList}
                rowSelection={rowSelection}
                rowKey={(record) => record.key}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: (event) => {
                      setSelectedRowKeys([record.key]);
                    },
                  };
                }}
              />
              <Modal
                title="Confirm Delete"
                open={isModalVisible}
                onOk={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
              >
                <p>Are you sure to delete items selected !?</p>
              </Modal>
              {statusDoctorDetail && (
                <EditForm
                  open={statusDoctorDetail}
                  close={handleCloseDetailItem}
                  detailItem={itemDetail}
                  editName="Edit HB"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HearthBeat;
