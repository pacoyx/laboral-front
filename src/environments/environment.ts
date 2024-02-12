export const environment = {
  production: true,
  epRaiz: 'https://dev-laboral-back.azurewebsites.net',
  epImagesPublic: 'https://dev-laboral-back.azurewebsites.net/public',
  googleClientId:'439932421298-uuf25oiloqf2nbqefl1md5hc93vsso8d.apps.googleusercontent.com',  
  linkedinClientId:'78yvrrjvsx8hu6',
  linkedinRedirectUrl:'https://gentle-moss-01a23fa10.4.azurestaticapps.net/validatelogin?state=12ZpTvGc2chql4U',  

  epLogin: '/login',
  epRegistrarUsuario: '/registerUser',
  epValidarRegistroUsuario: '/validateRegisterUser',
  epValidarExisteUsuario: '/validateExistsUser',
  epRegistroEmpresa: '/registerCompany',
  epListarEmpPorUsu: '/getCompanyByIdUser',
  epRegistrarEmpleo: '/registerJob',
  epListarEmpleosPorUsu: '/getJobsByIdUser',
  epActualizarReclutador: '/updateDataUser',
  epListarReclutadorPorId: '/getRecruiterById',
  epActPwdReclutador: '/updatePasswordAccount',
  epListarEmpleosOpenClose: '/getJobsOpenClose',
  epEliminarEmpleosPorIds: '/deleteJobsByIds',

  epValidaTokenGoogle: '/validateTokenGoogle',
  epValidaTokenLinkedin: '/validateTokenLinkedin',

  
};
