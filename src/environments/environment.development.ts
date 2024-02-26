export const environment = {
  production: false,
  epRaiz: 'http://localhost:4001',
  epImagesPublic: 'http://localhost:4001/public',
  googleClientId:'981520994137-jeoi9je1nikppgossau431aa4c070ge2.apps.googleusercontent.com',
  linkedinClientId:'78yvrrjvsx8hu6',
  linkedinRedirectUrl:'http://localhost:4200/validatelogin',  
  
  epLogin: '/login',
  epRegistrarUsuario: '/registerUser',
  epValidarRegistroUsuario: '/validateRegisterUser',
  epValidarExisteUsuario: '/validateExistsUser',
  epRegistroEmpresa: '/registerCompany',
  epListarEmpPorUsu:'/getCompanyByIdUser'  ,
  epRegistrarEmpleo: '/registerJob',
  epListarEmpleosPorUsu:'/getJobsByIdUser',
  epActualizarReclutador: '/updateDataUser',
  epListarReclutadorPorId:'/getRecruiterById',
  epActPwdReclutador: '/updatePasswordAccount',
  epListarEmpleosOpenClose: '/getJobsOpenClose',
  epEliminarEmpleosPorIds: '/deleteJobsByIds',
  epValidaTokenGoogle: '/validateTokenGoogle',
  epValidaTokenLinkedin: '/validateTokenLinkedin',
  epListarCandidatosPorEmpleo: '/getCandidatesByJob',
  epListarPreguntasPorEmpleo: '/getQuestionsByJob',
  epListarCandidatosPorEmpleoChat:'/getCandidatesByJobChat',
  epListarEmpleosPorReclutador:'/getJobsByRecruiter',
  epRegistrarChatPorReclutadorCandidato:'/registerChat',
  epListarChatPorReclutadorCandidato:'/getChatsByRecruiterCandidate',
  epListarEmpleoPorId:'/getJobsById',
};
