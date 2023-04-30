import React, { useEffect, useState } from "react";
import {
  Button,
  Cascader,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  DatePicker,
} from "antd";
import patientApi from "../../api/modules/patient.api";
import doctorApi from "../../api/modules/doctor.api";
import hospitalApi from "../../api/modules/hospital.api";
import mediaRecordApi from "../../api/modules/mediaRecord.api.js";
import hearthBeatApi from "../../api/modules/hearthbeat.api";
import { toast } from "react-toastify";

const MediaRecordForm = ({ handleCancelModelAdd }) => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [IOTs, setIOTs] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedIOT, setSelectedIOT] = useState(null);
  const [selectedHospital, setSelectedHospital] = useState(null);

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const [form] = Form.useForm();

  const handleOk = () => {
    handleCancelModelAdd(false);
  };
  const handleCancel = () => {
    handleCancelModelAdd(false);
  };

  const handleCascaderChangeHospital = (value) => {
    setSelectedHospital(value);
  }

  const handleCascaderChange = (value) => {
    setSelectedPatient(value);
  }

  const handleCascaderChangeIOT = (value) => {
    setSelectedIOT(value);
  }

  

  const onFinish = async (mediaRecordFN) => {
    await mediaRecordApi.addMediaRecord(mediaRecordFN);
    await patientApi.updatePatientStatus(selectedPatient, true);
    await hearthBeatApi.updateHbStatus(selectedIOT, true);
    const {responseHNCCCD, error} = await hearthBeatApi.updateHbPatientCCCD(selectedIOT, selectedPatient);
    if(responseHNCCCD)
    {
      console.log("update success")
    }
    else if(error)
    {
      console.log(error)
    }
    await toast.success(`Add MediaRecord success`, {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    form.resetFields();
    handleCancelModelAdd(false);
  };

  useEffect(() => {
    if(!selectedHospital)
    {
      form.setFieldValue("IOT_Id", null);
      setSelectedIOT(null);
    }
    const getAllCombobox = async () => {
      try {
        const { response } = await patientApi.getPatientInActive();
        setPatients(response);
        const { responseDoctor } = await doctorApi.getAllDoctorCBB();
        setDoctors(responseDoctor);
        const { responseHospital } = await hospitalApi.getAllCbb();
        setHospitals(responseHospital);
        if(!selectedHospital) return;
        const { responseHB } = await hearthBeatApi.getAllHBCbb(selectedHospital);
        setIOTs(responseHB);
      } catch (error) {
        console.log(error);
      }
    };
    getAllCombobox();
  }, [selectedHospital]);

  useEffect(() => {
    if(!selectedPatient) return;
    const getPatientById = async () => {
      try {
        const { response } = await patientApi.getPatientById(
          selectedPatient
        );
        form.setFieldsValue({
          Age: response.age,
          gender: response.gender === 1 ? "Male" : "Female",
        });
      } catch (error) {
        console.log(error);
      }
    };
    getPatientById();
  }, [selectedPatient]);

  return (
    <div>
      <Modal
        title="Add MediaRecord"
        open={true}
        onOk={handleOk}
        footer={null}
        onCancel={handleCancel}
        width={{ width: "auto" }}
      >
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          style={{
            maxWidth: 1200,
          }}
          scrollToFirstError
        >
          <Row>
            <Col span={12}>
              <Form.Item
                name="patientId"
                label="Patient Name"
                rules={[
                  {
                    type: "array",
                    required: true,
                    message: "Please select a Patient Name!",
                  },
                ]}
              >
                <Cascader options={patients} onChange={handleCascaderChange }/>
              </Form.Item>

              <Form.Item
                name="doctorId"
                label="Doctor Name"
                rules={[
                  {
                    type: "array",
                    required: true,
                    message: "Please select a Doctor Name!",
                  },
                ]}
              >
                <Cascader options={doctors} />
              </Form.Item>

              <Form.Item
                name="hospitalId"
                label="Hospital Name"
                rules={[
                  {
                    type: "array",
                    required: true,
                    message: "Please select a Hospital Name!",
                  },
                ]}
              >
                <Cascader options={hospitals} onChange={handleCascaderChangeHospital}/>
              </Form.Item>

              <Form.Item
                name="IOT_Id"
                label="IOT Name"
                rules={[
                  {
                    type: "array",
                    required: true,
                    message: "Please select a Hospital Name!",
                  },
                ]}
              >
                <Cascader options={IOTs}  onChange={handleCascaderChangeIOT }/>
              </Form.Item>

              <Form.Item
                name="date_start"
                label="Date Start"
                rules={[
                  {
                    required: true,
                    message: "Please input date start!",
                  },
                ]}
              >
                <DatePicker/>
              </Form.Item>

              <Form.Item
                name="date_end"
                label="Date End"
                rules={[
                  {
                    required: true,
                    message: "Please input date end!",
                  },
                ]}
              >
                <DatePicker/>
              </Form.Item>

              <Form.Item
                name="Age"
                label="Age"
                tooltip="Age patient"
                rules={[
                  {
                    required: true,
                    message: "Please input Age patient!",
                  },
                ]}
              >
                <InputNumber
                 disabled
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>

              <Form.Item
                name="gender"
                label="Gender"
                rules={[
                  {
                    required: true,
                    message: "Please select gender!",
                  },
                ]}
              >
                <Input disabled/>
              </Form.Item>

              <Form.Item
                name="CP"
                label="CP"
                tooltip="The type of chest pain the patient is experiencing (0-3)."
                rules={[
                  {
                    required: true,
                    message: "Please input CP patient!",
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
                name="Trestbps"
                label="Trestbps"
                tooltip="Venous pressure (trest) when the patient is at rest"
                rules={[
                  {
                    required: true,
                    message: "Please input trestbps patient!",
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
            </Col>

            <Col span={12}>
              <Form.Item
                name="Chol"
                label="Chol"
                tooltip="Cholesterol level in the patient's blood"
                rules={[
                  {
                    required: true,
                    message: "Please input chol patient!",
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
                name="Fbs"
                label="Fbs"
                tooltip="The patient's fasting blood sugar ('0' if < 120 mg/dl, '1' if > 120 mg/dl)."
                rules={[
                  {
                    required: true,
                    message: "Please input fbs patient!",
                  },
                ]}
              >
                <InputNumber
                  min={0}
                  max={1}
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>

              <Form.Item
                name="Restecg"
                label="Restecg"
                tooltip="ECG results (0-2)"
                rules={[
                  {
                    required: true,
                    message: "Please input restecg patient!",
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
                name="Thalach"
                label="Thalach"
                tooltip="Maximum heart rate achieved by the patient"
                rules={[
                  {
                    required: true,
                    message: "Please input thalach patient!",
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
                name="Exang"
                label="Exang"
                tooltip="the patient had exercise-induced angina with no (0) or yes (1)."
                rules={[
                  {
                    required: true,
                    message: "Please input exang patient!",
                  },
                ]}
              >
                <InputNumber
                  min={0}
                  max={1}
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>

              <Form.Item
                name="Oldpeak"
                label="Oldpeak"
                tooltip="ST depression induced by exercise compared with rest"
                rules={[
                  {
                    required: true,
                    message: "Please input oldpeak patient!",
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
                name="Slope"
                label="Slope"
                tooltip="Slope of the training ST segment (0-2)."
                rules={[
                  {
                    required: true,
                    message: "Please input slope patient!",
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
                name="Ca"
                label="Ca"
                tooltip="The number of coronary arteries is mainly narrowed (0-3)"
                rules={[
                  {
                    required: true,
                    message: "Please input ca patient!",
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
                name="Thal"
                label="Thal"
                tooltip="the patient's type of heart disease (1: thalassemia moderate
2: thalassemia major
3: don't have thalassemia)."
                rules={[
                  {
                    required: true,
                    message: "Please input thal patient!",
                  },
                ]}
              >
                <InputNumber
                  min={1}
                  max={3}
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default MediaRecordForm;
