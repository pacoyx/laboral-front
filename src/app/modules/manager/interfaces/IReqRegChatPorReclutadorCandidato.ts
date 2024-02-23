export interface IReqRegChatPorReclutadorCandidato {
  idReclutador: number;
  idCandidato: number;
  idEmpleo: number;
  idCab: number;
  mensaje: string;
  participante: string;
}

export interface IResRegChatPorReclutadorCandidato {
  codigoRespuesta: string;
  data: string;
}
