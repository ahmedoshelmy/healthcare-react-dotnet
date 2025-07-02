import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Row,
  Typography,
  Layout,
  message,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { getExams } from "../services/examService";
import type { Exam, ExamFilter } from "../types/exam";
import "../styles/ExamsPage.css";

const { RangePicker } = DatePicker;
const { Option } = Select;
const { Title } = Typography;
const { Sider, Content } = Layout;

const ExamsPage: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const fetchData = async (filters?: Partial<ExamFilter>) => {
    setLoading(true);
    try {
      const exams = await getExams(filters);
      setData(exams);
    } catch (err) {
      message.error("Failed to fetch exams");
    }
    setLoading(false);
  };

  const handleSearch = async () => {
    const values = form.getFieldsValue();
    const filters: Partial<ExamFilter> = {};

    if (values.patientId) filters.patientId = values.patientId;
    if (values.patientName) filters.patientName = values.patientName;
    if (values.gender) filters.gender = values.gender;
    if (values.email) filters.email = values.email;
    if (values.examType) filters.examType = values.examType;
    if (values.status) filters.status = values.status;
    if (values.examDateRange) {
      filters.examDateFrom = values.examDateRange[0].format("YYYY-MM-DD");
      filters.examDateTo = values.examDateRange[1].format("YYYY-MM-DD");
    }

    await fetchData(filters);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const columns: ColumnsType<Exam> = [
    { title: "Patient ID", dataIndex: "patientId" },
    { title: "Name", dataIndex: "patientName" },
    { title: "Gender", dataIndex: "gender" },
    { title: "Birthdate", dataIndex: "birthdate" },
    { title: "Email", dataIndex: "email" },
    { title: "Exam Type", dataIndex: "examType" },
    { title: "Exam Date", dataIndex: "examDate" },
    { title: "Status", dataIndex: "status" },
    { title: "Comments", dataIndex: "comments" },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={280} className="filter-sider">
        <div style={{ padding: 16 }}>
          <Title level={4} style={{ color: "#fff" }}>
            Filters
          </Title>
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSearch}
            className="filter-form"
          >
            <Form.Item name="patientId" label="Patient ID">
              <Input />
            </Form.Item>
            <Form.Item name="patientName" label="Patient Name">
              <Input />
            </Form.Item>
            <Form.Item name="gender" label="Gender">
              <Select allowClear>
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>
            <Form.Item name="email" label="Email">
              <Input />
            </Form.Item>
            <Form.Item name="examType" label="Exam Type">
              <Select allowClear>
                <Option value="CT Brain">CT Brain</Option>
                <Option value="Chest X-Ray">Chest X-Ray</Option>
                <Option value="MRI Spine">MRI Spine</Option>
              </Select>
            </Form.Item>
            <Form.Item name="status" label="Exam Status">
              <Select allowClear>
                <Option value="Scheduled">Scheduled</Option>
                <Option value="Arrived">Arrived</Option>
                <Option value="Canceled">Canceled</Option>
                <Option value="Completed">Completed</Option>
              </Select>
            </Form.Item>
            <Form.Item name="examDateRange" label="Exam Date Range">
              <RangePicker style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Search
              </Button>
              <Button
                block
                style={{ marginTop: 8 }}
                onClick={() => {
                  form.resetFields();
                  fetchData();
                }}
              >
                Reset
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Sider>

      <Layout>
        <Content style={{ padding: 24 }}>
          <Row
            justify="space-between"
            align="middle"
            style={{ marginBottom: 16 }}
          >
            <Title level={3} style={{ margin: 0 }}>
              Radiologist Worklist
            </Title>
            <Button type="primary" onClick={() => navigate("/add-exam")}>
              + New Exam
            </Button>
          </Row>

          <Table
            columns={columns}
            dataSource={data}
            loading={loading}
            rowKey="id"
            bordered
            onRow={(record) => ({
              onDoubleClick: () => {
                navigate(`/exams/${record.id}`);
              },
            })}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default ExamsPage;
