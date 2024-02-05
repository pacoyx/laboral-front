export interface IResLogin {
    codigoRespuesta: string;
    data: IResLoginData;
    token:string;
  }
  
  interface IResLoginData {
    correo_corporativo: string;
    nombres_completo: string;
    nombre_empresa: string;
    celular: string;
    icono:string;
  }