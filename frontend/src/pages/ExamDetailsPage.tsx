import React from "react";
import { Card, Descriptions, Button, Row, Col, Typography, Image } from "antd";
import { useNavigate, useParams } from "react-router-dom";

const { Title } = Typography;

// Dummy data – replace with real fetch
const dummyExam = {
  patientId: "123456",
  patientName: "John Doe",
  gender: "Male",
  birthdate: "1985-06-15",
  email: "johndoe@example.com",
  examType: "CT Brain",
  dateTime: "2025-07-01T14:30:00",
  comments: "Patient reports dizziness.",
  status: "Completed",
  images: ["/placeholder-1.png", "/placeholder-2.png"],
};

const ExamDetailsPage: React.FC = () => {
  const { examId } = useParams();
  const navigate = useNavigate();

  return (
    <div style={{ padding: 24 }}>
      <Button type="link" onClick={() => navigate(-1)}>
        &larr; Back to Worklist
      </Button>

      <Title level={2} style={{ marginBottom: 16 }}>
        Exam Details
      </Title>

      <Card bordered style={{ marginBottom: 24 }}>
        <Descriptions title="Patient Information" column={2} size="middle">
          <Descriptions.Item label="Patient ID">
            {dummyExam.patientId}
          </Descriptions.Item>
          <Descriptions.Item label="Name">
            {dummyExam.patientName}
          </Descriptions.Item>
          <Descriptions.Item label="Gender">
            {dummyExam.gender}
          </Descriptions.Item>
          <Descriptions.Item label="Birthdate">
            {dummyExam.birthdate}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{dummyExam.email}</Descriptions.Item>
        </Descriptions>

        <Descriptions
          title="Exam Information"
          column={2}
          size="middle"
          style={{ marginTop: 24 }}
        >
          <Descriptions.Item label="Type">
            {dummyExam.examType}
          </Descriptions.Item>
          <Descriptions.Item label="Date & Time">
            {new Date(dummyExam.dateTime).toLocaleString()}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            {dummyExam.status}
          </Descriptions.Item>
          <Descriptions.Item label="Comments">
            {dummyExam.comments}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Row gutter={24}>
        <Col span={16}>
          <Card title="Images" bordered>
            <Row gutter={[16, 16]}>
              {dummyExam.images.map((src, index) => (
                <Col span={12} key={index}>
                  <Image
                    src={src}
                    alt={`Exam Image ${index + 1}`}
                    width="100%"
                    style={{ borderRadius: 8 }}
                    placeholder
                  />
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        <Col span={8}>
          <Card title="Measurement Tools" bordered>
            <p>🧪 Distance Measurement (coming soon)</p>
            <p>📏 Angle Tool (coming soon)</p>
            <p>📐 Zoom/Pan</p>
            <p>🖊️ Annotate</p>
            <Button type="primary" disabled block>
              Export Measurements
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ExamDetailsPage;
