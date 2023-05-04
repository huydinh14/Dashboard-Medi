import {
  Button,
  Col,
  Divider,
  Drawer,
  Form,
  Input,
  InputNumber,
  Modal,
  Result,
  Row,
} from "antd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect, useState } from "react";
import "./detairecord.css";
import mediaRecordApi from "../../api/modules/mediaRecord.api";
import { toast } from "react-toastify";
import hearthBeatApi from "../../api/modules/hearthbeat.api";
import patientApi from "../../api/modules/patient.api";

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const DetaiRecord = ({ open, close, detailRecord, statusFetcch }) => {
  const [predictorResult, setPredictorResult] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
  const [statusEditMedia, setStatusEditMedia] = useState(false);
  const [form] = Form.useForm();
  const [dataEdit, setDataEdit] = useState({});
  const [dataDetailChange, setDataDetailChange] = useState({});
  const [currentDetailRecord, setCurrentDetailRecord] = useState(detailRecord);

  const predictorMediaRecord = async (predictor) => {
    const { response } = await mediaRecordApi.predictor(predictor);
    if (response) {
      const percent = parseFloat(response) * 100;
      setPredictorResult(percent.toFixed(2));
      await toast.success(`Predictor success with ${percent.toFixed(4)}%`, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const endMediaRecord = async (medi) => {
    const { response } = await mediaRecordApi.endMediaRecord(medi._id);
    await hearthBeatApi.updateHbStatus(medi.iot_id.id, false);
    await patientApi.updatePatientStatus(medi.patient.id, false);
    close();
    statusFetcch();
    if (response) {
      toast.success(`End MediaRecord success`, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const updateMeDetailVistal = async (dataEdit) => {
    const { response } = await mediaRecordApi.updateMediaRecord(
      currentDetailRecord._id,
      dataEdit
    );
    if (response) {
      setCurrentDetailRecord(response);
      toast.success(`Update success`, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const onFinishTab2 = async (values) => {
    setIsModalVisibleEdit(true);
    setDataEdit(values);
  };

  const handleEditVitalSigns = () => {
    setStatusEditMedia(true);
  };

  const onChildrenDrawerClose = () => {
    setStatusEditMedia(false);
  };

  const handleDeleteConfirm = () => {
    endMediaRecord(currentDetailRecord);
    // Ẩn dialog xác nhận
    setIsModalVisible(false);
  };

  const handleDeleteConfirmEdit = () => {
    //UPDATE EDIT
    if (dataEdit) {
      updateMeDetailVistal(dataEdit);
      setStatusEditMedia(false);
    }
    // Ẩn dialog xác nhận
    setIsModalVisibleEdit(false);
    //close();
  };

  const handleDeleteCancel = () => {
    // Ẩn dialog xác nhận
    setIsModalVisible(false);
  };

  const handleDeleteCancelEdit = () => {
    // Ẩn dialog xác nhận
    setIsModalVisibleEdit(false);
    setDataEdit({});
  };

  const handleDelete = () => {
    setIsModalVisible(true);
  };

  return (
    <>
      <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={close}
        open={open}
      >
        <Row>
          <Col span={18}>
            <p
              className="site-description-item-profile-p"
              style={{
                marginBottom: 24,
                fontWeight: 500,
                marginLeft: -13,
              }}
            >
              Detail MediaRecord
            </p>
          </Col>
          <Col span={6}>
            {currentDetailRecord.status === 1 && (
              <Button
                type="dashed"
                style={{ color: "red" }}
                //onClick={() => endMediaRecord(currentDetailRecord)}
                onClick={() => handleDelete()}
              >
                End MediaRecord
              </Button>
            )}
            {
              <Modal
                title="Confirm Delete"
                open={isModalVisible}
                onOk={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
              >
                <p>Are you sure to DELETE items selected !?</p>
              </Modal>
            }
          </Col>
        </Row>
        <p className="site-description-item-profile-p">Information</p>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Full Name"
              content={currentDetailRecord.patient.name}
            />
          </Col>
          <Col span={4}>
            <DescriptionItem
              title="Age"
              content={currentDetailRecord.patient.age}
            />
          </Col>
          <Col span={8}>
            <DescriptionItem
              title="Gender"
              content={
                currentDetailRecord.patient.gender === 1 ? "Male" : "Female"
              }
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="CCCD"
              content={currentDetailRecord.patient.CCCD}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Phone Patient"
              content={currentDetailRecord.patient.phone}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Doctor Name"
              content={currentDetailRecord.doctor.name}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Phone Doctor"
              content={currentDetailRecord.doctor.phone}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Email"
              content={currentDetailRecord.doctor.email}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Specialist"
              content={currentDetailRecord.doctor.specialist}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Hospital Name"
              content={currentDetailRecord.hospital.name}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Phone"
              content={currentDetailRecord.hospital.phone}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Address Hospital"
              content={currentDetailRecord.hospital.address}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="IOT Device"
              content={
                currentDetailRecord.iot_id.name_device +
                " - " +
                currentDetailRecord.iot_id.ip_mac
              }
            />
          </Col>
        </Row>
        <Divider />
        {/* <p className="site-description-item-profile-p">Vital Signs</p> */}
        {/* age,sex,cp,trestbps,chol,fbs,restecg,thalach,exang,oldpeak,slope,ca,thal,target */}
        <Row>
          <Col span={18}>
            <p
              className="site-description-item-profile-p"
              style={{
                marginBottom: 24,
                fontWeight: 500,
                marginLeft: -13,
              }}
            >
              Vital Signs
            </p>
          </Col>
          <Col span={6}>
            <Button
              type="dashed"
              style={{ color: "green" }}
              onClick={() => handleEditVitalSigns(currentDetailRecord)}
            >
              Edit Vital Signs
            </Button>
            {statusEditMedia && (
              <Drawer
                title=" Edit Vital Signs"
                width={320}
                closable={false}
                onClose={onChildrenDrawerClose}
                open={statusEditMedia}
              >
                <Form
                  name="vitas_signs"
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 16,
                  }}
                  style={{
                    maxWidth: 600,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinishTab2}
                >
                  <Form.Item
                    label="cp"
                    name="cp"
                    initialValue={currentDetailRecord.vital_signs[2]}
                    rules={[
                      {
                        required: true,
                        message: "Please input cp !",
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="trestbps"
                    name="trestbps"
                    initialValue={currentDetailRecord.vital_signs[3]}
                    rules={[
                      {
                        required: true,
                        message: "Please input trestbps !",
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="chol"
                    name="chol"
                    initialValue={currentDetailRecord.vital_signs[4]}
                    rules={[
                      {
                        required: true,
                        message: "Please input chol !",
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="fbs"
                    name="fbs"
                    initialValue={currentDetailRecord.vital_signs[5]}
                    rules={[
                      {
                        required: true,
                        message: "Please input fbs !",
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="restecg"
                    name="restecg"
                    initialValue={currentDetailRecord.vital_signs[6]}
                    rules={[
                      {
                        required: true,
                        message: "Please input restecg !",
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="thalach"
                    name="thalach"
                    initialValue={currentDetailRecord.vital_signs[7]}
                    rules={[
                      {
                        required: true,
                        message: "Please input thalach !",
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="exang"
                    name="exang"
                    initialValue={currentDetailRecord.vital_signs[8]}
                    rules={[
                      {
                        required: true,
                        message: "Please input exang !",
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="oldpeak"
                    name="oldpeak"
                    initialValue={currentDetailRecord.vital_signs[9]}
                    rules={[
                      {
                        required: true,
                        message: "Please input oldpeak !",
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="slope"
                    name="slope"
                    initialValue={currentDetailRecord.vital_signs[10]}
                    rules={[
                      {
                        required: true,
                        message: "Please input slope !",
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="ca"
                    name="ca"
                    initialValue={currentDetailRecord.vital_signs[11]}
                    rules={[
                      {
                        required: true,
                        message: "Please input ca !",
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    label="thal"
                    name="thal"
                    initialValue={currentDetailRecord.vital_signs[12]}
                    rules={[
                      {
                        required: true,
                        message: "Please input thal !",
                      },
                    ]}
                  >
                    <InputNumber
                      min={0}
                      style={{
                        width: "100%",
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                  {
                    <Modal
                      title="Confirm Edit"
                      open={isModalVisibleEdit}
                      onOk={handleDeleteConfirmEdit}
                      onCancel={handleDeleteCancelEdit}
                    >
                      <p>Are you sure to EDIT items selected !?</p>
                    </Modal>
                  }
                </Form>
              </Drawer>
            )}
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <DescriptionItem
              title="cp"
              content={currentDetailRecord.vital_signs[2]}
            />
          </Col>
          <Col span={6} style={{ fontWeight: "bold" }}>
            <DescriptionItem
              title="trestbps"
              content={currentDetailRecord.vital_signs[3]}
            />
          </Col>
          <Col span={6} style={{ fontWeight: "bold" }}>
            <DescriptionItem
              title="chol"
              content={currentDetailRecord.vital_signs[4]}
            />
          </Col>
          <Col span={6}>
            <DescriptionItem
              title="fbs"
              content={currentDetailRecord.vital_signs[5]}
            />
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <DescriptionItem
              title="restecg"
              content={currentDetailRecord.vital_signs[6]}
            />
          </Col>
          <Col span={6}>
            <DescriptionItem
              title="thalach"
              content={currentDetailRecord.vital_signs[7]}
            />
          </Col>
          <Col span={6}>
            <DescriptionItem
              title="exang"
              content={currentDetailRecord.vital_signs[8]}
            />
          </Col>
          <Col span={6}>
            <DescriptionItem
              title="oldpeak"
              content={currentDetailRecord.vital_signs[9]}
            />
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <DescriptionItem
              title="slope"
              content={currentDetailRecord.vital_signs[10]}
            />
          </Col>
          <Col span={6}>
            <DescriptionItem
              title="ca"
              content={currentDetailRecord.vital_signs[11]}
            />
          </Col>
          <Col span={6}>
            <DescriptionItem
              title="thal"
              content={currentDetailRecord.vital_signs[12]}
            />
          </Col>
        </Row>
        <Divider />
        <p className="site-description-item-profile-p">Action</p>
        <Row>
          <Col span={24} style={{ fontWeight: "bold" }}>
            <DescriptionItem
              title="Predictor"
              content="AI predicts heart rate results right below"
            />
          </Col>
          <Col span={3} style={{ fontWeight: "bold" }}>
            <p style={{ color: "#282A36", marginTop: "3px" }}>Result</p>
          </Col>
          <Col span={5}>
            <p style={{ fontWeight: "bold", color: "red", fontSize: "20px" }}>
              {predictorResult
                ? predictorResult + " %"
                : (parseFloat(currentDetailRecord?.target) * 100).toFixed(2) +
                  " %"}
            </p>
          </Col>
          <Col span={16}>
            {predictorResult !== 0 && (
              <CheckCircleIcon style={{ color: "green", marginTop: "3px" }} />
            )}
          </Col>
          <Col span={24} style={{ textAlign: "center", marginTop: "10px" }}>
            <Button
              type="primary"
              onClick={() => predictorMediaRecord(currentDetailRecord._id)}
            >
              Predictor
            </Button>
          </Col>
        </Row>
      </Drawer>
    </>
  );
};

export default DetaiRecord;
