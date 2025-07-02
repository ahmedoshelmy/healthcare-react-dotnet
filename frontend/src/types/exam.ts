export type ExamStatus = "Scheduled" | "Arrived" | "Canceled" | "Completed";

export interface ExamFormValues {
  patientId: string;
  patientName: string;
  gender: "Male" | "Female";
  birthdate: string;
  email: string;
  examType: string;
  dateTime: string;
  comments?: string;
  status: ExamStatus;
}

export interface ExamFilter {
  patientId?: string;
  patientName?: string;
  gender?: string;
  birthdate?: string; // ISO format (YYYY-MM-DD)
  email?: string;
  examType?: string;
  examDateFrom?: string; // ISO date
  examDateTo?: string; // ISO date
  status?: string;
}

export interface Exam extends ExamFormValues {
  id: number;
}
