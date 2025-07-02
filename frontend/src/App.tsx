import "./App.css";
import { ConfigProvider, theme } from "antd";
import AppRoutes from "./routes/AppRoutes";

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
      <AppRoutes />
    </ConfigProvider>
  );
}

export default App;
