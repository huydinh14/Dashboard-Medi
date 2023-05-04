import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DatePicker, Modal, Space, Table, Tag } from "antd";
import mediaRecordApi from "../api/modules/mediaRecord.api";
import { toast } from "react-toastify";
import MediaRecordForm from "../component/media-record-form/MediaRecordForm";
import DetaiRecord from "../component/detail-record/DetaiRecord";
import Loading from "../component/loading/Loading";

const { RangePicker } = DatePicker;
const columns = [
  {
    title: "Patient Name",
    width: 100,
    dataIndex: ["patient", "name"],
    key: "patientName",
    fixed: "left",
  },
  {
    title: "Doctor Name",
    width: 100,
    dataIndex: ["doctor", "name"],
    key: "doctorName",
    fixed: "left",
  },
  {
    title: "Date start",
    dataIndex: "date_start",
    key: "1",
    width: 150,
    render: (text) => <span>{dayjs(text).format("DD/MM/YYYY")}</span>,
  },
  {
    title: "sex",
    dataIndex: ["vital_signs", 1],
    key: "2",
    width: 150,
    render: (_, { sex }) => (
      <>
        <span>{sex !== 1 ? "Male" : "Female"}</span>
      </>
    ),
  },
  {
    title: "age",
    dataIndex: ["vital_signs", 0],
    key: "3",
    width: 150,
  },
  {
    title: "thalach",
    dataIndex: ["vital_signs", 7],
    key: "4",
    width: 150,
  },
  {
    title: "fbs",
    dataIndex: ["vital_signs", 5],
    key: "5",
    width: 150,
  },
  {
    title: "cholestoral",
    dataIndex: ["vital_signs", 4],
    key: "6",
    width: 150,
  },
  {
    title: "hospital name",
    dataIndex: ["hospital", "name"],
    key: "7",
    width: 150,
  },
  {
    title: "Status",
    key: "operation",
    dataIndex: "status",
    fixed: "right",
    width: 100,
    render: (_, { status }) => (
      <>
        <Tag color={status === 1 ? "green" : "volcano"}>
          {status === 1 ? "Active" : "Inactive"}
        </Tag>
      </>
    ),
  },
  {
    title: "Detail",
    key: "operation",
    fixed: "right",
    width: 100,
    render: () => <a style={{ fontWeight: "bold" }}>Detail</a>,
  },
];

const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current > dayjs().endOf("day");
};

const MediaRecord = () => {
  const [data, setData] = useState([]);
  const [dateRangeChange, setDateRangeChange] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDetail, setIsModalOpenDetail] = useState(false);
  const [detailRecord, setDetailRecord] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisibleDelete, setIsModalVisibleDelete] = useState(false);

  const handleChangeDate = (value) => {
    try {
      if (value?.length === 0) return;
      setDateRangeChange(value);
    } catch (error) {}
  };

  const handleRowSelection = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleDeleteMediaConfirm = async () => {
    if (data.length === 0) return;
    const newData = data.filter((item) => !selectedRowKeys.includes(item.key));
    const itemDelete = data
      .filter((item) => selectedRowKeys.includes(item.key))
      .map((item) => item._id);
    setData(newData);
    const { response } = await mediaRecordApi.deleteMediaRecord(itemDelete);
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
    setIsModalVisibleDelete(false);
  };
  const handleDeleteMediaCancel = () => {
    setIsModalVisibleDelete(false);
  };

  const handleDeleteMedia = () => {
    setIsModalVisibleDelete(true);
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
        onSelect: handleDeleteMedia,
      },
    ],
  };

  const showModalAddPatient = () => {
    setIsModalOpen(true);
  };

  const handleCloseDetailRecord = () => {
    setIsModalOpenDetail(false);
    //fetchData();
  };

  const fetchDataRunning = () => {
    fetchData();
  };

  const handleCancelModelAdd = (value) => {
    setIsModalOpen(value);
    fetchData();
  };

  const fetchData = async () => {
    setIsLoading(true);
    const { response, err } = await mediaRecordApi.getMediaRecord(
      dayjs().subtract(7, "days"),
      dayjs()
    );
    setIsLoading(false);
    if (response) {
      setData(response);
    }
    if (err) toast.error(err);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { response, err } = await mediaRecordApi.getMediaRecord(
        dateRangeChange[0],
        dateRangeChange[1]
      );
      if (response) {
        setData(response);
      }
      if (err) toast.error(err);
    };
    fetchData();
  }, [dateRangeChange]);

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h2 className="page-header">Media Record</h2>
          <div
            className="btn_nav"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div className="btn btn-add">
              <button onClick={showModalAddPatient}>Add MediaRecord</button>
            </div>
            {isModalOpen && (
              <MediaRecordForm handleCancelModelAdd={handleCancelModelAdd} />
            )}
            <div className="date_picker">
              <Space direction="vertical" size={12}>
                <RangePicker
                  disabledDate={disabledDate}
                  defaultValue={[dayjs().subtract(7, "days"), dayjs()]}
                  onChange={handleChangeDate}
                />
              </Space>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <Table
                    columns={columns}
                    dataSource={data}
                    rowSelection={rowSelection}
                    rowKey={(record) => record.key}
                    scroll={{
                      x: 1500,
                      y: window.innerHeight - 220,
                    }}
                    onRow={(record, rowIndex) => {
                      return {
                        onClick: (event) => {
                          // console.log("🚀 ~ file: MediaRecord.jsx:80 ~ event", event)
                          // console.log("🚀 ~ file: MediaRecord.jsx:80 ~ record", record)
                          // console.log("🚀 ~ file: MediaRecord.jsx:80 ~ rowIndex", rowIndex)
                          setSelectedRowKeys([record.key]);
                          setIsModalOpenDetail(true);
                          setDetailRecord(record);
                        }, // click row
                        // onDoubleClick: (event) => {}, // double click row
                        // onContextMenu: (event) => {}, // right button click row
                        // onMouseEnter: (event) => {}, // mouse enter row
                        // onMouseLeave: (event) => {}, // mouse leave row
                      };
                    }}
                  />
                  {isModalOpenDetail && (
                    <DetaiRecord
                      open={isModalOpenDetail}
                      close={handleCloseDetailRecord}
                      detailRecord={detailRecord}
                      statusFetcch={fetchDataRunning}
                    />
                  )}
                  {
                    <Modal
                      title="Confirm Delete"
                      open={isModalVisibleDelete}
                      onOk={handleDeleteMediaConfirm}
                      onCancel={handleDeleteMediaCancel}
                    >
                      <p>Are you sure to delete items selected !?</p>
                    </Modal>
                  }
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MediaRecord;
