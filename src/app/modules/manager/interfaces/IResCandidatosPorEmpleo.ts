export interface IResCandidatosPorEmpleo{
    codigoRespuesta: string;
    hasData: boolean;
    data: IResCandidatosPorEmpleoDet[];
  }
  
  export interface IResCandidatosPorEmpleoDet {
    id_cliente: number;
    nombres: string;
    apellidos: string;
    potencial: string;
    compatibilidad: number;
    linkedin: string;
    enlace_cv: string;
    sel: boolean;
    celular: string;
  }