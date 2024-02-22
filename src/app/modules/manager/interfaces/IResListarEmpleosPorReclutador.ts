export interface IResListarEmpleosPorReclutador {
  codigoRespuesta: string;
  hasData: boolean;
  data: IResListarEmpleosPorReclutadorDet[];
}

export interface IResListarEmpleosPorReclutadorDet {
  id_job_description: number;
  job_title: string;  
}
