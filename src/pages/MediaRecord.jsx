import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { DatePicker, Space, Table, Tag } from "antd";
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

  const handleChangeDate = (value) => {
    try {
      if (value?.length === 0) return;
      setDateRangeChange(value);
    } catch (error) {}
  };

  const showModalAddPatient = () => {
    setIsModalOpen(true);
  };

  const handleCloseDetailRecord = () => {
    setIsModalOpenDetail(false);
  };
  
  const fetchDataRunning = () => {
    fetchData();
  }

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
