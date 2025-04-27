import React from "react";
import cls from "./WorkItem.module.scss";
import { JobApplication } from "../../types";
import { handleEdit } from "../../functions/functions.js";

type WorkItemProps = {
  initialWork: JobApplication;
};

const WorkItem: React.FC<WorkItemProps> = ({ initialWork }) => {

    const [work, setWork] = React.useState<JobApplication>(initialWork);
  
  
  const getStatusClass = (status: string) => {
    if (["Оффер", "Прошёл все интервью", "Принято"].includes(status))
      return cls.positive;
    if (["Отказ", "Не принято"].includes(status)) return cls.negative;
    return cls.neutral;
  };

  const getTrustClass = (trust: string) => {
    if (trust === "Норм") return cls.positive;
    if (["Стрем", "Подозрительно"].includes(trust)) return cls.negative;
    return cls.neutral;
  };

  const getTestTaskStatusClass = (status?: string) => {
    if (status === "Принято") return cls.positive;
    if (status === "Не принято") return cls.negative;
    return cls.neutral;
  };

  const getEmploymentClass = (type: string) => {
    if (["Полная", "Частичная", "Удалёнка"].includes(type)) return cls.positive;
    if (["Контракт", "Офис"].includes(type)) return cls.negative;
    return cls.neutral;
  };

  const getWorkFormatClass = (format: string) => {
    if (format === "Удалёнка") return cls.positive;
    if (format === "Офис") return cls.negative;
    return cls.neutral;
  };



  return (
    <div className={cls.workItem}>
      <h3 className={cls.position}>{work.position}</h3>
      <p className={cls.company}>Компания: {work.company}</p>
      <p className={`${cls.status} ${getStatusClass(work.status)}`}>
        Статус: {work.status}
      </p>
      <p className={`${cls.trust} ${getTrustClass(work.trust)}`}>
        Уровень доверия: {work.trust}
      </p>
      <p className={cls.salary}>Зарплата: {work.salary || "Не указано"}</p>
      <p className={cls.source}>Источник: {work.source}</p>
      <p className={`${cls.employmentType} ${getEmploymentClass(work.employmentType)}`}>
        Тип занятости: {work.employmentType}
      </p>
      <p className={`${cls.workFormat} ${getWorkFormatClass(work.workFormat)}`}>
        Формат работы: {work.workFormat}
      </p>
      <p className={cls.appliedDate}>Дата подачи: {work.appliedDate}</p>
      <p className={cls.replyReceived}>
        Ответ получен: {work.replyReceived ? "Да" : "Нет"}
      </p>

      {work.testTask && (
        <div className={cls.testTask}>
          {work.testTask.status && (
            <p className={`${cls.testTaskStatus} ${getTestTaskStatusClass(work.testTask.status)}`}>
              Статус: {work.testTask.status}
            </p>
          )}
          {work.testTask.sentDate && <p>Дата отправки: {work.testTask.sentDate}</p>}
          {work.testTask.status && <p>Статус: {work.testTask.status}</p>}
        </div>
      )}

      <p className={cls.requirements}>
        Требования:{" "}
        {work.requirements.length > 0 ? work.requirements.join(", ") : "Нет требований"}
      </p>

      {work.notes && <p className={cls.notes}>Заметки: {work.notes}</p>}

      {work.link && (
        <p className={cls.link}>
          Ссылка:{" "}
          <a href={work.link} target="_blank" rel="noopener noreferrer">
            {work.link}
          </a>
        </p>
      )}

      <button className={cls.editButton} onClick={()=>handleEdit(work.id, setWork)}>
        Редактировать
      </button>
    </div>
  );
};

export default WorkItem;
