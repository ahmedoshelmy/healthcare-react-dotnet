import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AddExamPage from "./pages/AddExamPage";
import ExamsPage from "./pages/ExamsPage";
import { ConfigProvider, theme } from "antd";
import ExamDetailsPage from "./pages/ExamDetailsPage";

function App() {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#40a9ff",
          colorBgBase: "#0e1a2b",
          // colorBgContainer: "0e1a2b",
          colorTextBase: "#e6edf3",
          borderRadius: 8,
          fontFamily: "Inter, sans-serif",
        },
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/add-exam" element={<AddExamPage />} />
          <Route path="/exams" element={<ExamsPage />} />
          <Route path="/exam/:examId" element={<ExamDetailsPage />} />
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
