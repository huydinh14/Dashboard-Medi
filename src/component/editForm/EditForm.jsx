import React, { useState, useEffect } from "react";
import { Button, Drawer, Form, Input, InputNumber, Radio, Select } from "antd";
import hospitalApi from "../../api/modules/hospital.api";
import doctorApi from "../../api/modules/doctor.api";
import { toast } from "react-toastify";
import patientApi from "../../api/modules/patient.api";
import hearthBeatApi from "../../api/modules/hearthbeat.api";

const EditForm = ({ open, close, detailItem, editName }) => {
  const [hospitalList, setHospitalList] = useState([]);
  const [patients, setPatients] = useState([]);

  const { Option } = Select;

  const onFinishDoctorEditItem = async (values) => {
    const { response } = await doctorApi.updateDoctor(values.doctor);
    if (response) {
      toast.success(`Edit Success!`, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      close();
    }
  };

  const onFinishPatientEditItem = async (values) => {
    for (let key in values.user) {
      if (values.user[key] === undefined) {
        values.user[key] = detailItem[key];
      }
    }
    const { response } = await patientApi.updatePatient(values.user);
    if (response) {
      toast.success(`Edit Success!`, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      close();
    }
  };

  const onFinishHBEditItem = async (values) => {
    if(values.hb.patient_cccd === undefined){
      values.hb.patient_cccd = null;
    }
    const { response } = await hearthBeatApi.updateHB(values.hb);
    if (response) {
      toast.success(`Edit Success!`, {
        position: "bottom-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      close();
    }
  };

const onFinishHospitalEditItem = async (values) => {
  // if(values.hb.patient_cccd === undefined){
  //   values.hb.patient_cccd = null;
  // }
  const { response } = await hospitalApi.updateHospital(values.hospital);
  if (response) {
    toast.success(`Edit Success!`, {
      position: "bottom-left",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    close();
  }
};

  const fetchPatients = async () => {
    try {
      const { response } = await patientApi.getPatientInActive();
      setPatients(response);
    } catch (error) {
      console.log("Failed to fetch patient list: ", error);
    }
  };

  useEffect(() => {
    const fetchHospitalList = async () => {
      try {
        const { responseHospital } = await hospitalApi.getAllCbb();
        setHospitalList(responseHospital);
      } catch (error) {
        console.log("Failed to fetch hospital list: ", error);
      }
    };
    fetchHospitalList();
    fetchPatients();
  }, []);
  return (
    <>
      {editName === "Edit Doctor" && (
        <Drawer
          title="Edit Information Doctor"
          placement="right"
          onClose={close}
          open={open}
          width="35%"
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
            onFinish={onFinishDoctorEditItem}
          >
            <Form.Item
              name={["doctor", "id"]}
              style={{ display: "none" }}
              initialValue={detailItem?._id}
            ></Form.Item>
            <Form.Item
              name={["doctor", "name"]}
              label="Name"
              initialValue={detailItem?.name}
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
              initialValue={detailItem?.phone}
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
              initialValue={detailItem?.specialist}
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
              initialValue={detailItem?.email}
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
              initialValue={detailItem?.hospital_id?.name}
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
                offset: 8,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      )}
      {editName === "Edit Patient" && (
        <Drawer
          title="Edit Information Patient"
          placement="right"
          onClose={close}
          open={open}
          width="35%"
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
            onFinish={onFinishPatientEditItem}
          >
            <Form.Item
              name={["user", "id"]}
              style={{ display: "none" }}
              initialValue={detailItem?._id}
            ></Form.Item>
            <Form.Item
              name={["user", "name"]}
              label="Name"
              initialValue={detailItem?.name}
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
              initialValue={detailItem?.age}
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
              <Radio.Group defaultValue={detailItem?.gender.toString()}>
                <Radio value="1"> Male </Radio>
                <Radio value="0"> Female </Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name={["user", "phone"]}
              initialValue={detailItem?.phone}
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
              initialValue={detailItem?.CCCD}
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
              initialValue={detailItem?.hospital_id?.name}
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
                offset: 8,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      )}
      {editName === "Edit HB" && (
        <Drawer
          title="Edit HearthBeat-IOT"
          placement="right"
          onClose={close}
          open={open}
          width="35%"
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
            onFinish={onFinishHBEditItem}
          >
            <Form.Item
              name={["hb", "id"]}
              style={{ display: "none" }}
              initialValue={detailItem?._id}
            ></Form.Item>
            <Form.Item
              name={["hb", "name_device"]}
              initialValue={detailItem?.name_device}
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
              initialValue={detailItem?.ip_mac}
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
              initialValue={detailItem?.hospital_id?.name}
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
              name={["hb", "patient_cccd"]}
              initialValue={detailItem?.patient_cccd?.id}
              label="Patient"
            >
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
                offset: 8,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      )}
      {
        editName === "Edit Hospital" && (
          <Drawer
          title="Edit Hospital"
          placement="right"
          onClose={close}
          open={open}
          width="35%"
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
            onFinish={onFinishHospitalEditItem}
          >
            <Form.Item
              name={["hospital", "id"]}
              style={{ display: "none" }}
              initialValue={detailItem?._id}
            ></Form.Item>
            <Form.Item
                name={["hospital", "name"]}
                initialValue={detailItem?.name}
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
                initialValue={detailItem?.address}
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
                initialValue={detailItem?.phone}
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
                offset: 8,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
        )
      }
    </>
  );
};

export default EditForm;
