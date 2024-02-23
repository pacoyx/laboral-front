export interface IResListarChatsPorReclutador {
  codigoRespuesta: string;
  hasData: boolean;
  data: IResListarChatsPorReclutadorDet[];
}

export interface IResListarChatsPorReclutadorDet {
  iddet: number;
  id_cab: number;
  message: string;
  owner: string;
  type_owner:string;
}
