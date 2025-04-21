import React from "react";
import { useEffect, useState } from "react";
import "./App.css";
import {
  ApplicationStatus,
  EmploymentType,
  JobApplication,
  TestTask,
  TrustLevel,
  WorkFormat,
} from "./types";
import Modal from "./components/Modal/Modal";
import Form from "./components/Form/Form";
import worksJSON from "../worksJSON.json"; ///////////////////////////////////////////////////////////////////////////////////////////////////
import WorkItem from "./components/WorkItem/WorkItem";

function App() {
  const [works, setWorks] = useState<JobApplication[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [trustLevel, setTrustLevel] = useState<TrustLevel | "">("");
  const [applicationStatus, setApplicationStatus] = useState<
    ApplicationStatus | ""
  >("");
  const [workFormat, setWorkFormat] = useState<WorkFormat | "">("");
  const [employmentType, setEmploymentType] = useState<EmploymentType | "">("");
  const [testTask, setTestTask] = useState<TestTask | null>(null);

  const getFilteredWorks = () => {
    return works.filter((work) => {
      const matchTrust = trustLevel ? work.trust === trustLevel : true;
      const matchStatus = applicationStatus
        ? work.status === applicationStatus
        : true;
      const matchFormat = workFormat ? work.workFormat === workFormat : true;
      const matchEmployment = employmentType
        ? work.employmentType === employmentType
        : true;
      const matchTestTask = testTask
        ? work.testTask?.required === testTask.required
        : true;

      return (
        matchTrust &&
        matchStatus &&
        matchFormat &&
        matchEmployment &&
        matchTestTask
      );
    });
  };
  const resetFilters = () => {
    setTrustLevel("");
    setApplicationStatus("");
    setWorkFormat("");
    setEmploymentType("");
    setTestTask(null);
  };

  useEffect(() => {
    const storedWorks: string = "";
    if (storedWorks) {
      const parsedWorks: JobApplication[] = JSON.parse(storedWorks);
      if (Array.isArray(parsedWorks)) {
        setWorks(parsedWorks);
      }
    } else {
      localStorage.setItem("works", JSON.stringify(worksJSON));
      const parsedWorks: JobApplication[] = JSON.parse(storedWorks);
      if (Array.isArray(parsedWorks)) {
        setWorks(parsedWorks);
      }
    }
  }, []);

  const handleSave = (data: JobApplication) => {
    const updatedWorks = [...works, data];
    setWorks(updatedWorks);
    localStorage.setItem("works", JSON.stringify(updatedWorks));
    setIsModalOpen(false);
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>добавить отклик</button>
      <div>
        <button onClick={resetFilters}>Сбросить фильтры</button>
        <select
          value={trustLevel}
          onChange={(e) => setTrustLevel(e.target.value as TrustLevel | "")}
        >
          <option value="">все уровни доверия</option>
          <option value="Норм">Норм</option>
          <option value="Стрем">Стрем</option>
          <option value="Подозрительно">Подозрительно</option>
          <option value="хз">хз</option>
        </select>
        <select
          value={applicationStatus}
          onChange={(e) =>
            setApplicationStatus(e.target.value as ApplicationStatus | "")
          }
        >
          <option value="">все статусы</option>
          <option value="Откликнулся">Откликнулся</option>
          <option value="Пригласили на интервью">Пригласили на интервью</option>
          <option value="Прошёл HR">Прошёл HR</option>
          <option value="Прошёл тех">Прошёл тех</option>
          <option value="Прошёл все интервью">Прошёл все интервью</option>
          <option value="Ожидание ответа">Ожидание ответа</option>
          <option value="Оффер">Оффер</option>
          <option value="Отказ">Отказ</option>
          <option value="Не откликнулся">Не откликнулся</option>
        </select>
        <select
          value={workFormat}
          onChange={(e) => setWorkFormat(e.target.value as WorkFormat | "")}
        >
          <option value="">все форматы</option>
          <option value="Удалёнка">Удалёнка</option>
          <option value="Офис">Офис</option>
          <option value="Гибрид">Гибрид</option>
        </select>
        <select
          value={employmentType}
          onChange={(e) =>
            setEmploymentType(e.target.value as EmploymentType | "")
          }
        >
          <option value="">все уровни доверия</option>
          <option value="Полная">Полная</option>
          <option value="Частичная">Частичная</option>
          <option value="Стажировка">Стажировка</option>
          <option value="Контракт">Контракт</option>
        </select>
        <select
          value={
            testTask?.required === true
              ? "true"
              : testTask?.required === false
              ? "false"
              : ""
          }
          onChange={(e) => {
            const value = e.target.value;
            if (value === "") {
              setTestTask(null);
            } else {
              setTestTask({ required: value === "true" });
            }
          }}
        >
          <option value="">все задания</option>
          <option value="true">есть тестовое</option>
          <option value="false">без тестового</option>
        </select>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Form onSave={handleSave} />
      </Modal>

      <h1>Работы</h1>
      {getFilteredWorks().length > 0 ? (
        getFilteredWorks().map((work) => (
          <div key={work.id}>
            <WorkItem work={work} />
          </div>
        ))
      ) : (
        <p>Нет данных</p>
      )}
    </div>
  );
}

export default App;
