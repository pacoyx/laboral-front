import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild, inject } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { IReqListarEmpleosPorReclutador } from '../../interfaces/IReqListarEmpleosPorReclutador';
import { IResListarEmpleosPorReclutadorDet } from '../../interfaces/IResListarEmpleosPorReclutador';
import { IReqCandidatosPorEmpleo } from '../../interfaces/IReqCandidatosPorEmpleo';
import {
  IResCandidatosPorEmpleo,
  IResCandidatosPorEmpleoDet,
} from '../../interfaces/IResCandidatosPorEmpleo';
import { IReqRegChatPorReclutadorCandidato } from '../../interfaces/IReqRegChatPorReclutadorCandidato';
import { Subscription } from 'rxjs';
import { IReqListarChatsPorReclutador } from '../../interfaces/IReqListarChatsPorReclutador';
import { IResListarChatsPorReclutadorDet } from '../../interfaces/IResListarChatsPorReclutador';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat-mg',
  templateUrl: './chat-mg.component.html',
  styleUrls: ['./chat-mg.component.scss'],
})
export class ChatMgComponent implements OnInit, OnDestroy, AfterViewChecked {
  private empresaService = inject(EmpresaService);
  private renderer = inject(Renderer2);
  @ViewChild('target') private myScrollContainer!: ElementRef;

  vIdReclutador = 0;
  vNombreUsuario = '';
  vNombreChatBot = 'Chatbot';
  inputText = '';
  arr_mensajes: IResListarChatsPorReclutadorDet[] = [];
  arrEmpleos: IResListarEmpleosPorReclutadorDet[] = [];
  arrCandidatos: IResCandidatosPorEmpleoDet[] = [];
  canditatoSel!: IResCandidatosPorEmpleoDet;
  puestoSel = '';
  puestoIdSel = 0;
  idCabChat = 0;

  subscriptionRegChat!: Subscription;
  SubscriptionlistarChat!: Subscription;
  bolLoading = false;
  pathImgAvatar = '';
  icono = '';

  constructor() {
    const objLogin = JSON.parse(localStorage.getItem('laboral.ai')!);
    this.vNombreUsuario = objLogin.user.nombres_completo;
    this.vIdReclutador = objLogin.user.id;
    this.arr_mensajes = [];

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

  ngOnDestroy(): void {
    if (this.subscriptionRegChat) this.subscriptionRegChat.unsubscribe();
    if (this.SubscriptionlistarChat) this.SubscriptionlistarChat.unsubscribe();
  }

  ngOnInit(): void {
    this.cargarMensajes();
    this.cargarPublicaciones();

    const objLogin = JSON.parse(localStorage.getItem('laboral.ai')!);
    this.icono = objLogin.user.icono || '';
    this.pathImgAvatar =
      objLogin.tipo == 'sistema'
        ? environment.epImagesPublic + '/' + this.icono
        : this.icono;
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();  
    }

  scrollToBottom(): void {    
    
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {console.log('error scrol', err);
    }
  }

  cargarMensajes() {
    console.log('cargando mensajes del chat...');
    // idreclutador, idpostulante, idpuesto
    // this.vIdReclutador
    // this.canditatoSel.id_cliente
    // this.puestoIdSel
    const req: IReqListarChatsPorReclutador = {
      idReclutador: this.vIdReclutador,
      idCandidato: this.canditatoSel.id_cliente,
      idEmpleo: this.puestoIdSel,
    };
    this.arr_mensajes=[];
    this.bolLoading = true;
    this.SubscriptionlistarChat = this.empresaService
      .listarChatPorReclutadorCandidatoEmpleo(req)
      .subscribe({
        next: (resp) => {
          console.log(resp);
          this.bolLoading = false;
          this.idCabChat = 0;
          if (resp.codigoRespuesta == '00' && resp.hasData) {
            this.arr_mensajes = resp.data;
            this.idCabChat = resp.data[0].id_cab;
          }
        },
        error: (err) => {
          console.log(err);
          this.bolLoading = false;
        },
        complete: () => {
          console.log('Complete listarChatPorReclutadorCandidatoEmpleo()');
        },
      });
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

    this.canditatoSel = item;
    this.arrCandidatos.forEach((e) => {
      e.sel = false;
    });

    if (event.currentTarget.checked) {
      item.sel = true;
      this.cargarMensajes();
    } else {
      item.sel = false;
    }

  }

  enviarMsg(value: string) {
    this.arr_mensajes.push({
      owner: this.vNombreUsuario,
      message: value,
      id_cab: this.idCabChat,
      iddet: 0,
      type_owner: 'R',
    });
    this.inputText = '';
    this.renderer.selectRootElement('#txtMsg').focus();

    const req: IReqRegChatPorReclutadorCandidato = {
      idReclutador: this.vIdReclutador,
      idCandidato: this.canditatoSel.id_cliente,
      idEmpleo: this.puestoIdSel,
      idCab: this.idCabChat,
      mensaje: value,
      participante: this.vNombreUsuario,
    };

    this.subscriptionRegChat = this.empresaService
      .registrarChatPorReclutadorCandidatoEmpleo(req)
      .subscribe({
        next: (resp) => {
          console.log(resp);
          if (resp.codigoRespuesta == '00') {
            console.log('se registro elchat');
          }
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log('Complete registrarChatPorReclutadorCandidatoEmpleo()');
        },
      });
  }
}
