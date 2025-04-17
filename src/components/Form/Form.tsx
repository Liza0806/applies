import { useForm } from 'react-hook-form';
import { JobApplication, ApplicationStatus, TrustLevel, EmploymentType, WorkFormat } from '../../types';
import cls from './Form.module.scss'; 

const applicationStatuses: ApplicationStatus[] = [
  "Откликнулся", "Пригласили на интервью", "Прошёл HR", "Прошёл тех",
  "Прошёл все интервью", "Ожидание ответа", "Оффер", "Отказ"
];

const trustLevels: TrustLevel[] = ["Норм", "Стрем", "Подозрительно", "хз"];
const employmentTypes: EmploymentType[] = ["Полная", "Частичная", "Стажировка", "Контракт"];
const workFormats: WorkFormat[] = ["Удалёнка", "Офис", "Гибрид"];

type Props = {
  onSave: (data: JobApplication) => void;
};

const Form: React.FC<Props> = ({ onSave }) => {
  const { register, handleSubmit } = useForm<Omit<JobApplication, "id" | "replyReceived">>({
    defaultValues: {
      trust: 'Норм',
    },
  });

  const onSubmit = (data: Omit<JobApplication, "id" | "replyReceived">) => {
    const jobWithId: JobApplication = {
      ...data,
      id: Date.now().toString(),
      replyReceived: false,
    };
    onSave(jobWithId);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cls.form}>
      <input {...register('position')} placeholder="Должность" required />
      <input {...register('company')} placeholder="Компания" required />

      <select {...register('status')}>
        {applicationStatuses.map(status => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>

      <select {...register('trust')}>
        {trustLevels.map(level => (
          <option key={level} value={level}>{level}</option>
        ))}
      </select>

      <input {...register('salary')} placeholder="Зарплата" />
      <input {...register('source')} placeholder="Источник (например Djinni)" required />

      <select {...register('employmentType')}>
        {employmentTypes.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>

      <select {...register('workFormat')}>
        {workFormats.map(format => (
          <option key={format} value={format}>{format}</option>
        ))}
      </select>

      <input type="date" {...register('appliedDate')} />

      <input {...register('requirements.0')} placeholder="Первое требование" />
      <textarea {...register('notes')} placeholder="Заметки" />
      <input {...register('link')} placeholder="Ссылка на вакансию" />

      <button type="submit">Сохранить</button>
    </form>
  );
};

export default Form;









//а давай сейчас сдедаем, чтобы при добавлении нового отклика, он сохранялся в works.json и чтобы при загрузке страницы данные автоматически брались из works.json ? расскажи с пояснениями, как и что мы будем делать