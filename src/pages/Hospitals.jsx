import React, { useEffect, useState } from "react";
import CustomTable from "../component/table/Table";
import {
  Alert,
  Button,
  Dropdown,
  Form,
  Input,
  Modal,
  Space,
  Table
} from "antd";
import hospitalApi from "../api/modules/hospital.api";
import EditForm from "../component/editForm/EditForm";
import { toast } from "react-toastify";

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

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const [hospitalList, setHospitalList] = useState([]);
  const [form] = Form.useForm();
  const [statusDoctorDetail, setStatusDoctorDetail] = useState(false);
  const [itemDetail, setItemDetail] = useState({});

  const validateMessages = {
    required: "${label} is required!",
    types: {
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const onFinish = (value) => {
    setErrorMessage(undefined);
    const fetchAddHB = async () => {
      try {
        const { response, error } = await hospitalApi.addHospital(value.hospital.name, value.hospital.address, value.hospital.phone);
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
    if (hospitalList.length === 0) return;
    const newData = hospitalList.filter(
      (item) => !selectedRowKeys.includes(item.key)
    );

    // Xóa row khỏi database
    const { response } = await hospitalApi.deleteHospital(selectedRowKeys);
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
      fetchData();
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
        const getItemSelect = hospitalList.find(
          (item) => item.key === itemSelect.key
        );
        await setItemDetail(getItemSelect);
        await setStatusDoctorDetail(true);
      },
    },
  ];

  const fetchData = async () => {
    try {
      const { response } = await hospitalApi.getAll();
      setHospitalList(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2 className="page-header">Hospitals</h2>
      <div className="btn btn-add">
        <button onClick={showModalAddPatient}>Add Hospital</button>
        {isModalOpen && (
          <Modal
            title="Add Hospital"
            open={isModalOpen}
            onOk={handleOk}
            footer={null}
            onCancel={handleCancel}
          >
            <Form
              form={form}
              {...layout}
              name="Add Hospital"
              onFinish={onFinish}
              style={{
                maxWidth: 600,
              }}
              validateMessages={validateMessages}
            >
              <Form.Item
                name={["hospital", "name"]}
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
                name={["hospital", "address"]}
                label="Address"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={["hospital", "phone"]}
                label="Phone"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
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
                columns={hospitalColumn}
                data={hospitalList}
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
                  editName="Edit Hospital"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hospitals;
