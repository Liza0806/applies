import { useForm } from "react-hook-form";
import React from "react";
import {
  JobApplication,
  ApplicationStatus,
  TrustLevel,
  EmploymentType,
  WorkFormat,
} from "../../types";
import cls from "./Form.module.scss";
import { onSubmit as submitData } from "../../functions/functions.js"; 

const applicationStatuses: ApplicationStatus[] = [
  "Откликнулся",
  "Пригласили на интервью",
  "Прошёл HR",
  "Прошёл тех",
  "Прошёл все интервью",
  "Ожидание ответа",
  "Оффер",
  "Отказ",
];

const trustLevels: TrustLevel[] = ["Норм", "Стрем", "Подозрительно", "хз"];
const employmentTypes: EmploymentType[] = [
  "Полная",
  "Частичная",
  "Стажировка",
  "Контракт",
];
const workFormats: WorkFormat[] = ["Удалёнка", "Офис", "Гибрид"];

type Props = {
  onSave: (data: JobApplication) => void;
  existingJob?: JobApplication;
};

const Form: React.FC<Props> = ({ onSave, existingJob }) => {
  const { register, handleSubmit } = useForm<Omit<JobApplication, "replyReceived">>({
    defaultValues: existingJob || {
      trust: "Норм",
    },
  });

  const submitHandler = async (data: Omit<JobApplication, "replyReceived">) => {
    try {
      const savedJob = await submitData(data as JobApplication); // если уверен, что всё ок
      onSave(savedJob);
    } catch (error) {
      console.error("Ошибка при сохранении работы:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className={cls.form}>
      <input {...register("position")} placeholder="Должность" required />
      <input {...register("company")} placeholder="Компания" required />

      <select {...register("status")}>
        {applicationStatuses.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      <select {...register("trust")}>
        {trustLevels.map((level) => (
          <option key={level} value={level}>
            {level}
          </option>
        ))}
      </select>

      <input {...register("salary")} placeholder="Зарплата" />
      <input {...register("source")} placeholder="Источник (например Djinni)" required />

      <select {...register("employmentType")}>
        {employmentTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <select {...register("workFormat")}>
        {workFormats.map((format) => (
          <option key={format} value={format}>
            {format}
          </option>
        ))}
      </select>

      <input type="date" {...register("appliedDate")} />

      <input {...register("requirements.0")} placeholder="Первое требование" />
      <textarea {...register("notes")} placeholder="Заметки" />
      <input {...register("link")} placeholder="Ссылка на вакансию" />

      <button type="submit">Сохранить</button>
    </form>
  );
};

export default Form;
