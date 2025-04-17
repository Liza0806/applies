export type ApplicationStatus =
  | "Откликнулся"
  | "Пригласили на интервью"
  | "Прошёл HR"
  | "Прошёл тех"
  | "Прошёл все интервью"
  | "Ожидание ответа"
  | "Оффер"
  | "Отказ"
  | "Не откликнулся";
export type TestTask = { 
  required: boolean;
  sentDate?: string;
  status?: "Отправлено" | "Принято" | "Проверяется" | "Не принято";
};
export type WorkFormat = "Удалёнка" | "Офис" | "Гибрид";
export type EmploymentType = "Полная" | "Частичная" | "Стажировка" | "Контракт";
export type TrustLevel = "Норм" | "Стрем" | "Подозрительно" | "хз" 
export interface JobApplication {
  id: string; // уникальный ID, например uuid
  position: string;
  company: string;
  trust: TrustLevel;
  salary?: string | number; // можно хранить как строку, если диапазон
  source: string; // откуда вакансия (Djinni, LinkedIn и т.п.)
  employmentType: EmploymentType;
  workFormat: WorkFormat;
  appliedDate: string; // ISO дата, например "2025-04-12"
  status: ApplicationStatus;
  replyReceived: boolean;
  testTask?: TestTask;
  requirements: string[];
  notes?: string;
  link?: string;
}
