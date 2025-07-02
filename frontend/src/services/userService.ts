import axios from "axios";

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  return await axios.post(
    "http://localhost:5181/api/users/login",
    credentials,
    {
      withCredentials: true,
    }
  );
};
