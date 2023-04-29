import React, { useEffect, useState } from "react";
import CustomTable from "../component/table/Table";
import { Slider, Switch } from "antd";
import ruleApi from "../api/modules/rule.api";

const marks = {
  0: "0",
  60: "60",
  100: "100",
  150: {
    style: {
      color: "#f50",
    },
    label: <strong>{`>`}150</strong>,
  },
};

const ConditionRule = () => {
  const [disabled, setDisabled] = useState(true);
  const [ruleList, setRuleList] = useState([]);
  const [value1, setValue1] = useState([]);
  const [value2, setValue2] = useState([]);
  const [value3, setValue3] = useState([]);

  const onChange = (checked) => {
    setDisabled(checked);
  };

  const handleChangeBradycardia = async (value) => {
    const { response } = await ruleApi.updateRule(
      "Bradycardia",
      value[0],
      value[1]
    );
    if (response) setValue1(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { response, error } = await ruleApi.getRule();
      console.log(
        "🚀 ~ file: ConditionRule.jsx:36 ~ fetchData ~ response:",
        response
      );
      if (response) {
        setRuleList(response);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchDataRule = async () => {
      if (ruleList.length === 0) return;
      const filterRule = ruleList.filter((item) => item.name === "Bradycardia");
      setValue1([filterRule[0].heartRateFrom, filterRule[0].heartRateTo]);
      const filterRule2 = ruleList.filter((item) => item.name === "Normal");
      setValue2([filterRule2[0].heartRateFrom, filterRule2[0].heartRateTo]);
      const filterRule3 = ruleList.filter(
        (item) => item.name === "Tachycardia"
      );
      setValue3([filterRule3[0].heartRateFrom, filterRule3[0].heartRateTo]);
    };
    fetchDataRule();
  }, [ruleList]);

  const columnRule = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: "true",
      width: "30%",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  const dataRule = [
    {
      key: "1",
      name: "Bradycardia",
      description:
        "Heart rate is less than 60 beats per minute. This condition can cause symptoms such as fatigue, dizziness, shortness of breath, and chest pain.",
    },
    {
      key: "2",
      name: "Normal",
      description:
        "Heart rate is between 60 and 100 beats per minute. This is considered a healthy heart rate range for most adults, but may vary depending on age, gender, and fitness level.",
    },
    {
      key: "3",
      name: "Tachycardia",
      description:
        "Heart rate is higher than 100 beats per minute. This condition may cause symptoms such as palpitations, shortness of breath, dizziness, and fatigue. If left untreated, it may lead to more serious complications.",
    },
  ];
  console.log("111", value1, value2, value3);
  return (
    <div>
      <h2 className="page-header">Pathogens</h2>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              Disabled:{" "}
              <Switch size="small" checked={disabled} onChange={onChange} />
              <h4>Bradycardia</h4>
              <Slider
                max={150}
                range
                value={[value1[0], value1[1]]}
                marks={marks}
                disabled={disabled}
                onChange={(value) => handleChangeBradycardia(value)}
              />
              <h4>Normal</h4>
              <Slider
                max={150}
                range
                value={[value2[0], value2[1]]}
                marks={marks}
                disabled={disabled}
              />
              <h4>Tachycardia</h4>
              <Slider
                max={150}
                range
                marks={marks}
                value={[value3[0], value3[1]]}
                disabled={disabled}
              />
            </div>
          </div>
        </div>
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <CustomTable
                columns={columnRule}
                data={dataRule}
                pagination={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConditionRule;
