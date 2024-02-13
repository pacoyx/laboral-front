export interface IResListarEmpPorUsu {
  codigoRespuesta: string;
  hasData: boolean;
  data: IResListarEmpPorUsuData;
}

export interface IResListarEmpPorUsuData {
  id_company: number;
  ruc: string;
  name: string;
  icon: string;
  rating: number;
  location: string;
  linkedin: string;
  webpage: string;
  endorse: string;
  about: string;
  state_company: number;
}
