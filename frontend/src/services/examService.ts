import axios from "axios";
import type { ExamFormValues, Exam, ExamFilter } from "../types/exam";

const API_BASE_URL = "http://localhost:5181/api/exams";

// Submit new exam
export const submitExam = async (form: ExamFormValues) => {
  const response = await axios.post(`${API_BASE_URL}`, form);
  return response.data;
};

// Get exams with optional filters
export const getExams = async (
  filters?: Partial<ExamFilter>
): Promise<Exam[]> => {
  const response = await axios.get(API_BASE_URL, {
    params: filters,
    paramsSerializer: (
      params: { [s: string]: unknown } | ArrayLike<unknown>
    ) => {
      const query = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          query.append(key, value.toString());
        }
      });
      return query.toString();
    },
  });
  return response.data;
};

// Get a single exam
export const getExamById = async (id: number): Promise<Exam> => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  return response.data;
};

// Delete an exam
export const deleteExam = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/${id}`);
};

export const createExam = async (form: ExamFormValues): Promise<Exam> => {
  const response = await axios.post(API_BASE_URL, form);
  return response.data;
};
