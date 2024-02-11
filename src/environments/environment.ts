export const environment = {
  production: true,
  epRaiz: 'https://dev-laboral-back.azurewebsites.net',
  epImagesPublic: 'https://dev-laboral-back.azurewebsites.net/public',
  googleClientId:'981520994137-jeoi9je1nikppgossau431aa4c070ge2.apps.googleusercontent.com',
  linkedinClientId:'78yvrrjvsx8hu6',
  linkedinRedirectUrl:'https://gentle-moss-01a23fa10.4.azurestaticapps.net/validatelogin',  

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
