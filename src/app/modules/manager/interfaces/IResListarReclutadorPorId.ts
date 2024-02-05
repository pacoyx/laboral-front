export interface IResListarReclutadorPorId{
    codigoRespuesta: string;
    hasData: boolean;
    data: IResListarReclutadorPorIdDet;
}

interface IResListarReclutadorPorIdDet {
    id_recruiter: number;
    email: string;
    user_name: string;
    name: string;
    last_name: string;
    cell_number: string;
    address: string;
    location: string;
    id_company: number;
    password_user: string;
    state_user: number;
  }