import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { IReqListarEmpleosPorReclutador } from '../../interfaces/IReqListarEmpleosPorReclutador';
import { IResListarEmpleosPorReclutadorDet } from '../../interfaces/IResListarEmpleosPorReclutador';
import { IReqCandidatosPorEmpleo } from '../../interfaces/IReqCandidatosPorEmpleo';
import {
  IResCandidatosPorEmpleo,
  IResCandidatosPorEmpleoDet,
} from '../../interfaces/IResCandidatosPorEmpleo';

@Component({
  selector: 'app-chat-mg',
  templateUrl: './chat-mg.component.html',
  styleUrls: ['./chat-mg.component.scss'],
})
export class ChatMgComponent implements OnInit, OnDestroy {
  private empresaService = inject(EmpresaService);

  vIdReclutador = 0;
  vNombreUsuario = '';
  vNombreChatBot = 'Chatbot';
  inputText = '';
  arr_mensajes = [{ usuario: '', msg: '' }];
  arrEmpleos: IResListarEmpleosPorReclutadorDet[] = [];
  arrCandidatos: IResCandidatosPorEmpleoDet[] = [];
  canditatoSel!: IResCandidatosPorEmpleoDet;
  puestoSel = '';
  puestoIdSel = 0;

  constructor() {
    const objLogin = JSON.parse(localStorage.getItem('laboral.ai')!);
    this.vNombreUsuario = objLogin.user.nombres_completo;
    this.vIdReclutador = objLogin.user.id;
    this.arr_mensajes = [
      {
        usuario: this.vNombreChatBot,
        msg: `Hola 😃 luciana, 
        te quería comentar que actualmente me encuentro dirigiendo un proceso de selección para la empresa Farmacias Peruana, 
        el puesto es de UX Designer/Researcher. He visto tu perfil y creo que encajarías muy bien con lo solicitado para el puesto.
        `,
      },
    ];

    this.canditatoSel = {
      nombres: '',
      apellidos: '',
      compatibilidad: 0,
      enlace_cv: '',
      id_cliente: 0,
      linkedin: '',
      potencial: '',
      sel: false,
      celular: '',
    };
  }
  ngOnDestroy(): void {}
  ngOnInit(): void {
    this.cargarMensajes();
    this.cargarPublicaciones();
  }

  cargarMensajes() {
    console.log('cargando mensajes del chat...');
    // idreclutador, idpostulante, idpuesto
    // this.vIdReclutador
    // this.canditatoSel.id_cliente
    // this.puestoIdSel

  }
  cargarPublicaciones() {
    const req: IReqListarEmpleosPorReclutador = {
      idRecruiter: this.vIdReclutador,
    };
    this.empresaService.listarEmpleosPorReclutadorChat(req).subscribe({
      next: (resp) => {
        console.log(resp);
        this.arrEmpleos = resp.data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete listarEmpleosPorReclutador()');
      },
    });
  }

  cargarPostulantesPorPublicacion(idJob: number) {
    const req: IReqCandidatosPorEmpleo = {
      idJob: idJob,
    };
    this.empresaService.listarCandidatosPorEmpleoChat(req).subscribe({
      next: (resp) => {
        console.log(resp);
        this.arrCandidatos = resp.data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('complete listarEmpleosPorReclutador()');
      },
    });
  }

  handleChange(event: any) {
    const empleoDescribe = this.arrEmpleos.filter(
      (p) => p.id_job_description == event.value
    );
    this.puestoSel = empleoDescribe[0].job_title;
    this.puestoIdSel = event.value;
    this.cargarPostulantesPorPublicacion(event.value);
  }

  handleSelCheck(event: any, item: IResCandidatosPorEmpleoDet) {
    console.log(item);
    console.log(event.currentTarget.checked);

    this.arrCandidatos.forEach((e) => {
      e.sel = false;
    });

    if (event.currentTarget.checked) {
      item.sel = true;
      this.cargarMensajes();
    } else {
      item.sel = false;
    }

    this.canditatoSel = item;
  }

  enviarMsg(value: string) {
    this.arr_mensajes.push({
      usuario: this.vNombreChatBot,
      msg: value,
    });
  }
}
