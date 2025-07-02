import React, { useEffect, useState } from "react";
import {
  Card,
  Descriptions,
  Button,
  Row,
  Col,
  Typography,
  Image,
  Spin,
  message,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const { Title } = Typography;

interface Exam {
  id: number;
  patientId: string;
  patientName: string;
  gender: string;
  birthdate: string; // ISO date string
  email?: string;
  examType: string;
  examDate: string; // ISO datetime string
  comments?: string;
  status: string;
  images?: string[]; // Optional, can be empty or undefined
}

const ExamDetailsPage: React.FC = () => {
  const { examId } = useParams<{ examId: string }>();
  const navigate = useNavigate();

  const [exam, setExam] = useState<Exam | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!examId) {
      message.error("Invalid exam ID");
      navigate("/exams");
      return;
    }

    axios
      .get<Exam>(`http://localhost:5181/api/exams/${examId}`)
      .then((res) => {
        setExam(res.data);
      })
      .catch((err) => {
        console.error(err);
        message.error("Failed to load exam details");
        navigate("/exams");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [examId, navigate]);

  if (loading) {
    return (
      <Spin
        tip="Loading exam details..."
        style={{ marginTop: 100, display: "block", textAlign: "center" }}
      />
    );
  }

  if (!exam) {
    return null; // Or a fallback UI
  }

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
            {exam.patientId}
          </Descriptions.Item>
          <Descriptions.Item label="Name">{exam.patientName}</Descriptions.Item>
          <Descriptions.Item label="Gender">{exam.gender}</Descriptions.Item>
          <Descriptions.Item label="Birthdate">
            {new Date(exam.birthdate).toLocaleDateString()}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {exam.email ?? "-"}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions
          title="Exam Information"
          column={2}
          size="middle"
          style={{ marginTop: 24 }}
        >
          <Descriptions.Item label="Type">{exam.examType}</Descriptions.Item>
          <Descriptions.Item label="Date & Time">
            {new Date(exam.examDate).toLocaleString()}
          </Descriptions.Item>
          <Descriptions.Item label="Status">{exam.status}</Descriptions.Item>
          <Descriptions.Item label="Comments">
            {exam.comments ?? "-"}
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Row gutter={24}>
        <Col span={16}>
          <Card title="Images" bordered>
            <Row gutter={[16, 16]}>
              {exam.images && exam.images.length > 0 ? (
                exam.images.map((src, index) => (
                  <Col span={12} key={index}>
                    <Image
                      src={src}
                      alt={`Exam Image ${index + 1}`}
                      width="100%"
                      style={{ borderRadius: 8 }}
                      placeholder
                    />
                  </Col>
                ))
              ) : (
                <p>No images available.</p>
              )}
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ExamDetailsPage;
