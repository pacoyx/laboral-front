export interface IResListarEmpleosPorUsu {
  codigoRespuesta: string;
  hasData: boolean;
  data: IResListarEmpleosPorUsuData[];
}

interface IResListarEmpleosPorUsuData {
  id_job_description: number;
  job_title: string;
  job_offer_link: string;
  company: string;
  req_qualifications: string;
  pref_qualifications: string;
  key_responsabilities: string;
  techskill_tool: string;
  language: string;
  knowledge: string;
  softskills: string;
  career_background: string;
  location: string;
  salary: number;
  date_entry: string;
  date_expiration: string;
  number_positions: number;
  status: string;
  nps: string;
}
