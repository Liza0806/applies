import axios from "axios";
import { JobApplication } from "../types";

export const fetchWorks = async () => {
    try {
      const response = await axios.get<JobApplication[]>("/get");
      if (Array.isArray(response.data)) {
        localStorage.setItem("works", JSON.stringify(response.data));
        return response.data
      }
    
    } catch (error) {
      console.error("Ошибка при получении данных с сервера:", error);
    } 
  };

  export const handleEdit = async ( id:string) => {
    const updatedData: Partial<JobApplication> = {
      status: "Оффер", ///////////////
      replyReceived: true, //////////////////
    };

    try {
      const response = await axios.put<JobApplication>(`/update/${id}`, updatedData);
      const updatedWork = response.data;
      onUpdate(updatedWork); ////////////////////
    } catch (error) {
      console.error("Ошибка при обновлении работы:", error);
    }
  };
