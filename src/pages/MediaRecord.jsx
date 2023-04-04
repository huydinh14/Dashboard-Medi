import React, { useEffect, useState } from "react";
import axios from "axios";
import apiCall from "../api/apiCall";
// import {
//   AutoComplete,
//   Button,
//   Cascader,
//   Checkbox,
//   Col,
//   Form,
//   Input,
//   InputNumber,
//   Row,
//   Select,
// } from "antd";
import dayjs from "dayjs";
import { DatePicker, Space } from "antd";
import { Table } from "antd";

// const { Option } = Select;
// const residences = [
//   {
//     value: "48:3F:DA:4E:92:B8",
//     label: "HBEAT483FDA4E92B8",
//   },
// ];
// const formItemLayout = {
//   labelCol: {
//     xs: {
//       span: 24,
//     },
//     sm: {
//       span: 8,
//     },
//   },
//   wrapperCol: {
//     xs: {
//       span: 24,
//     },
//     sm: {
//       span: 16,
//     },
//   },
// };
// const tailFormItemLayout = {
//   wrapperCol: {
//     xs: {
//       span: 24,
//       offset: 0,
//     },
//     sm: {
//       span: 16,
//       offset: 8,
//     },
//   },
// };

const { RangePicker } = DatePicker;
const columns = [
  {
    title: "Patient Name",
    width: 100,
    dataIndex: "patientName",
    key: "patientName",
    fixed: "left",
  },
  {
    title: "Doctor Name",
    width: 100,
    dataIndex: "doctorName",
    key: "doctorName",
    fixed: "left",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "1",
    width: 150,
  },
  {
    title: "Sex",
    dataIndex: "sex",
    key: "2",
    width: 150,
  },
  {
    title: "age",
    dataIndex: "age",
    key: "3",
    width: 150,
  },
  {
    title: "thalach",
    dataIndex: "address",
    key: "4",
    width: 150,
  },
  {
    title: "fbs",
    dataIndex: "fbs",
    key: "5",
    width: 150,
  },
  {
    title: "cholestoral",
    dataIndex: "cholestoral",
    key: "6",
    width: 150,
  },
  {
    title: "Hospital Name",
    dataIndex: "hospitalName",
    key: "7",
    width: 150,
  },
  {
    title: "HearthBeat Name",
    dataIndex: "heartBeatName",
    key: "8",
  },
  {
    title: "Detail",
    key: "operation",
    fixed: "right",
    width: 100,
    render: () => <a style={{ fontWeight: "bold" }}>action</a>,
  },
];

const disabledDate = (current) => {
  // Can not select days before today and today
  return current && current > dayjs().endOf("day");
};

const MediaRecord = () => {
  //   const [form] = Form.useForm();
  //   const onFinish = (values) => {
  //     console.log("Received values of form: ", values);
  //   };
  //   const prefixSelector = (
  //     <Form.Item name="prefix" noStyle>
  //       <Select
  //         style={{
  //           width: 70,
  //         }}
  //       >
  //         <Option value="86">+86</Option>
  //         <Option value="87">+87</Option>
  //       </Select>
  //     </Form.Item>
  //   );
  //   const suffixSelector = (
  //     <Form.Item name="suffix" noStyle>
  //       <Select
  //         style={{
  //           width: 70,
  //         }}
  //       >
  //         <Option value="USD">$</Option>
  //         <Option value="CNY">¥</Option>
  //       </Select>
  //     </Form.Item>
  //   );
  //   const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  //   const onWebsiteChange = (value) => {
  //     if (!value) {
  //       setAutoCompleteResult([]);
  //     } else {
  //       setAutoCompleteResult(
  //         [".com", ".org", ".net"].map((domain) => `${value}${domain}`)
  //       );
  //     }
  //   };
  //   const websiteOptions = autoCompleteResult.map((website) => ({
  //     label: website,
  //     value: website,
  //   }));

  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(apiCall + "/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div className="date_picker">
        <Space direction="vertical" size={12}>
          <RangePicker disabledDate={disabledDate} />
        </Space>
      </div>
      <h2 className="page-header">Media Record</h2>
      <div className="form_media-recors">
        <Table
          columns={columns}
          dataSource={data}
          scroll={{
            x: 1500,
            y: window.innerHeight - 220,
          }}
        />
        {/* <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          initialValues={{
            residence: ["zhejiang", "hangzhou", "xihu"],
            prefix: "86",
          }}
          style={{
            maxWidth: 600,
          }}
          scrollToFirstError
        >
          <Form.Item
            name="Patient Name"
            label="Patient Name"
            rules={[
              {
                type: "name",
                message: "The input is not valid Patient Name!",
              },
              {
                required: true,
                message: "Please input Patient Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="nickname"
            label="Nickname"
            tooltip="What do you want others to call you?"
            rules={[
              {
                required: true,
                message: "Please input your nickname!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="residence"
            label="Habitual Residence"
            rules={[
              {
                type: "array",
                required: true,
                message: "Please select your habitual residence!",
              },
            ]}
          >
            <Cascader options={residences} />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input
              addonBefore={prefixSelector}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            name="donation"
            label="Donation"
            rules={[
              {
                required: true,
                message: "Please input donation amount!",
              },
            ]}
          >
            <InputNumber
              addonAfter={suffixSelector}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            name="website"
            label="Website"
            rules={[
              {
                required: true,
                message: "Please input website!",
              },
            ]}
          >
            <AutoComplete
              options={websiteOptions}
              onChange={onWebsiteChange}
              placeholder="website"
            >
              <Input />
            </AutoComplete>
          </Form.Item>

          <Form.Item
            name="intro"
            label="Intro"
            rules={[
              {
                required: true,
                message: "Please input Intro",
              },
            ]}
          >
            <Input.TextArea showCount maxLength={100} />
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
            <Select placeholder="select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Captcha"
            extra="We must make sure that your are a human."
          >
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item
                  name="captcha"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "Please input the captcha you got!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Button>Get captcha</Button>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form> */}
      </div>
    </div>
  );
};

export default MediaRecord;
