export interface IResListarEmpleosOpenClose {
  codigoRespuesta: string;
  hasData: boolean;
  data: IResListarEmpleosOpenCloseDet[];
}

interface IResListarEmpleosOpenCloseDet {
  id_job_description: number;
  job_title: string;
  postulantes: number;
  evaluados: number;
  filtrados_ia: number;
  status: string;
  register_date: Date;
  location:string;
}
