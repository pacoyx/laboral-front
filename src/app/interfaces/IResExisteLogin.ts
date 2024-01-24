export interface IResExisteLogin {
    codigoRespuesta: string;
    data: IResExisteLoginDet;
    existe: string;
  }
  
  interface IResExisteLoginDet {
    correo_corporativo: string;
    clave: string;
    nombres_completo: string;
    nombre_empresa: string;
    celular: string;
    estado: number;
    fecha_reg: string;
  }