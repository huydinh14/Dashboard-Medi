import { Button, Col, Divider, Drawer, Result, Row } from "antd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from "react";
import "./detairecord.css";
import mediaRecordApi from "../../api/modules/mediaRecord.api";
import { toast } from "react-toastify";
import hearthBeatApi from "../../api/modules/hearthbeat.api";

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

const DetaiRecord = ({ open, close, detailRecord, statusFetcch }) => {
  const [predictorResult, setPredictorResult] = useState("");

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
            {detailRecord.status === 1 && (
              <Button
                type="dashed"
                style={{ color: "red" }}
                onClick={() => endMediaRecord(detailRecord)}
              >
                End MediaRecord
              </Button>
            )}
          </Col>
        </Row>
        <p className="site-description-item-profile-p">Information</p>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Full Name"
              content={detailRecord.patient.name}
            />
          </Col>
          <Col span={4}>
            <DescriptionItem title="Age" content={detailRecord.patient.age} />
          </Col>
          <Col span={8}>
            <DescriptionItem
              title="Gender"
              content={detailRecord.patient.gender === 1 ? "Male" : "Female"}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem title="CCCD" content={detailRecord.patient.CCCD} />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Phone Patient"
              content={detailRecord.patient.phone}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Doctor Name"
              content={detailRecord.doctor.name}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Phone Doctor"
              content={detailRecord.doctor.phone}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Email"
              content={detailRecord.doctor.email}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Specialist"
              content={detailRecord.doctor.specialist}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <DescriptionItem
              title="Hospital Name"
              content={detailRecord.hospital.name}
            />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="Phone"
              content={detailRecord.hospital.phone}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="Address Hospital"
              content={detailRecord.hospital.address}
            />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <DescriptionItem
              title="IOT Device"
              content={
                detailRecord.iot_id.name_device +
                " - " +
                detailRecord.iot_id.ip_mac
              }
            />
          </Col>
        </Row>
        <Divider />
        <p className="site-description-item-profile-p">Vital Signs</p>
        {/* age,sex,cp,trestbps,chol,fbs,restecg,thalach,exang,oldpeak,slope,ca,thal,target */}
        <Row>
          <Col span={6}>
            <DescriptionItem title="cp" content={detailRecord.vital_signs[2]} />
          </Col>
          <Col span={6} style={{fontWeight: "bold"}}>
            <DescriptionItem
              title="trestbps"
              content={detailRecord.vital_signs[3]}
            />
          </Col>
          <Col span={6} style={{fontWeight: "bold"}}>
            <DescriptionItem
              title="chol"
              content={detailRecord.vital_signs[4]}
            />
          </Col>
          <Col span={6}>
            <DescriptionItem
              title="fbs"
              content={detailRecord.vital_signs[5]}
            />
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <DescriptionItem
              title="restecg"
              content={detailRecord.vital_signs[6]}
            />
          </Col>
          <Col span={6}>
            <DescriptionItem
              title="thalach"
              content={detailRecord.vital_signs[7]}
            />
          </Col>
          <Col span={6}>
            <DescriptionItem
              title="exang"
              content={detailRecord.vital_signs[8]}
            />
          </Col>
          <Col span={6}>
            <DescriptionItem
              title="oldpeak"
              content={detailRecord.vital_signs[9]}
            />
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <DescriptionItem
              title="slope"
              content={detailRecord.vital_signs[10]}
            />
          </Col>
          <Col span={6}>
            <DescriptionItem
              title="ca"
              content={detailRecord.vital_signs[11]}
            />
          </Col>
          <Col span={6}>
            <DescriptionItem
              title="thal"
              content={detailRecord.vital_signs[12]}
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
                : (parseFloat(detailRecord?.target) * 100).toFixed(2) + " %"}
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
              onClick={() => predictorMediaRecord(detailRecord._id)}
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
