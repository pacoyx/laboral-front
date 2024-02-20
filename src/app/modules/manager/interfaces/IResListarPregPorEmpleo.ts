export interface IResListarPregPorEmpleo{
    codigoRespuesta: string;
    hasData: boolean;
    data: IResListarPregPorEmpleoDet[];
}

export interface IResListarPregPorEmpleoDet {
    id_question: number;
    id_job: number;
    id_recruiter: number;
    number_order: number;
    question: string;
    anwser: string;
    status_question: string;
  }