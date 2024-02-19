export interface IResListarCandiPorEmpleo {
  codigoRespuesta: string;
  hasData: boolean;
  data: IResListarCandiPorEmpleoDet[];
}

export interface IResListarCandiPorEmpleoDet {
  id_cliente: number;
  nombres: string;
  apellidos: string;
  potencial: string;
  compatibilidad: number;
  linkedin: string;
  enlace_cv: string;
}
