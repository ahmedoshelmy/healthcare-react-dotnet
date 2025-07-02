import React from "react";
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Typography,
  Row,
  Col,
  message,
} from "antd";
import { useNavigate } from "react-router-dom";
import type { ExamFormValues } from "../types/exam";
import { createExam } from "../services/examService";

const { Title } = Typography;
const { Option } = Select;

const AddExamPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    const formatted: ExamFormValues = {
      ...values,
      examDate: values.dateTime.format(), // convert to ISO string
      birthdate: values.birthdate.format("YYYY-MM-DD"),
    };

    try {
      await createExam(formatted);
      message.success("Exam successfully created!");
      form.resetFields();
      navigate("/exams"); // ✅ Redirect to worklist
    } catch (err) {
      console.error(err);
      message.error("Error submitting exam");
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
      <Title level={2}>Add New Exam</Title>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="patientId"
              label="Patient ID"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="patientName"
              label="Patient Name"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select gender">
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="birthdate"
              label="Birthdate"
              rules={[{ required: true }]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="examType"
          label="Exam Type"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select exam type">
            <Option value="CT Brain">CT Brain</Option>
            <Option value="Chest X-Ray">Chest X-Ray</Option>
            <Option value="MRI Spine">MRI Spine</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="dateTime"
          label="Exam Date & Time"
          rules={[{ required: true }]}
        >
          <DatePicker showTime style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="comments" label="Exam Comments">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          name="status"
          label="Exam Status"
          rules={[{ required: true }]}
        >
          <Select placeholder="Select status">
            {["Scheduled", "Arrived", "Canceled", "Completed"].map((status) => (
              <Option key={status} value={status}>
                {status}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit Exam
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddExamPage;
