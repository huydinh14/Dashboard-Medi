import React, { useEffect, useState } from "react";
import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  DatePicker,
  Space,
} from "antd";
import patientApi from "../../api/modules/patient.api";
import doctorApi from "../../api/modules/doctor.api";
import hospitalApi from "../../api/modules/hospital.api";
import mediaRecordApi from "../../api/modules/mediaRecord.api.js";
import hearthBeatApi from "../../api/modules/hearthbeat.api";

const MediaRecordForm = ({ handleCancelModelAdd }) => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [IOTs, setIOTs] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const { Option } = Select;
  // const patientList = [];
  // const doctorList = [];
  // const hospital = [];
  // const IOT = [];
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

  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const [form] = Form.useForm();

  const onConChangeDateStart = (date, dateString) => {
    console.log(date, dateString);
  };
  const onConChangeDateEnd = (date, dateString) => {
    console.log(date, dateString);
  };

  const handleOk = () => {
    handleCancelModelAdd(false);
  };
  const handleCancel = () => {
    handleCancelModelAdd(false);
  };

  const handleCascaderChange = (value) => {
    setSelectedPatient(value);
  }

  const onFinish = async (mediaRecordFN) => {
    await mediaRecordApi.addMediaRecord(mediaRecordFN);
    //form.resetFields();
    handleCancelModelAdd(false);
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
      </Select>
    </Form.Item>
  );

  const onWebsiteChange = (value) => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(
        [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
      );
    }
  };
  const websiteOptions = autoCompleteResult.map((website) => ({
    label: website,
    value: website,
  }));

  useEffect(() => {
    const getAllCombobox = async () => {
      try {
        const { response } = await patientApi.getPatientInActive();
        setPatients(response);
        const { responseDoctor } = await doctorApi.getAllDoctorCBB();
        setDoctors(responseDoctor);
        setDoctors(responseDoctor);
        const { responseHospital } = await hospitalApi.getAllCbb();
        setHospitals(responseHospital);
        const { responseHB } = await hearthBeatApi.getAllHBCbb();
        setIOTs(responseHB);
      } catch (error) {
        console.log(error);
      }
    };
    getAllCombobox();
  }, []);

  useEffect(() => {
    const getPatientById = async () => {
      try {
        const { response } = await patientApi.getPatientById(
          selectedPatient
        );
        console.log("🚀 ~ file: MediaRecordForm.jsx:144 ~ getPatientById ~ response:", response)
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
                <Cascader options={hospitals} />
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
                <Cascader options={IOTs} />
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
                <DatePicker onChange={onConChangeDateStart} />
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
                <DatePicker onChange={onConChangeDateEnd} />
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
