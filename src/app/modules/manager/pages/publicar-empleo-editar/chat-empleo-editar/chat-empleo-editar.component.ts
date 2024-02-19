import {
  Component,
  ViewChild,
  ElementRef,
  inject,
  Renderer2,
  Output,
  EventEmitter,
  OnInit,HostListener, AfterViewChecked 
} from '@angular/core';
import { Datachat } from '../../../interfaces/IDatachat';

@Component({
  selector: 'app-chat-empleo-editar',
  templateUrl: './chat-empleo-editar.component.html',
  styleUrls: ['./chat-empleo-editar.component.scss'],
})
export class ChatEmpleoEditarComponent implements OnInit,AfterViewChecked  {
  private renderer = inject(Renderer2);
  @ViewChild('target') private myScrollContainer!: ElementRef;
  @Output() dataChat = new EventEmitter<Datachat[]>();

  vNombreUsuario = '';
  vNombreChatBot = 'Chatbot';
  inputText = '';
  arr_mensajes = [{ usuario: '', msg: '' }];

  arrPreguntas = [
    {
      preg: '¿Cual es el nombre del empleo?',
      resp: '',
      tipo: 'texto',
      preview: 'Titulo del empleo',
      edicion: false,
    },
    {
      preg: '¿Puedes hacer una breve descripcion del trabajo a realizar?',
      resp: '',
      tipo: 'texto',
      preview: 'Descripción del puesto',
      edicion: false,
    },
    {
      preg: '¿Cuales son las funciones que va realizar? (separa cada funcion con un punto)',
      resp: '',
      tipo: 'lista',
      preview: 'Funciones',
      edicion: false,
    },
    {
      preg: '¿Puedes decirme los conocimientos y/o requisitos que se deben tener? (separa cada funcion con un punto)',
      resp: '',
      tipo: 'lista',
      preview: 'Conocimientos',
      edicion: false,
    },
    {
      preg: 'Indica el número de vacantes que solicitas para el empleo',
      resp: '',
      tipo: 'texto',
      preview: 'Vacantes',
      edicion: false,
    },
    {
      preg: '¿Cual es la localidad para trabajo?',
      resp: '',
      tipo: 'texto',
      preview: 'Localidad / lugar de trabajo',
      edicion: false,
    },
    {
      preg: '¿Cuanto es el salario para el puesto?',
      resp: '',
      tipo: 'texto',
      preview: 'Salario mensual',
      edicion: false,
    },
    {
      preg: '¿Cual es la fecha estimada para el inicio del trabajo? (yyyy-mm-dd)',
      resp: '',
      tipo: 'texto',
      preview: 'Fecha de inicio',
      edicion: false,
    },
  ];

  arrRespuestas: string[] = [];
  contPreg = 0;
  bolConfirmacion = false;
  bolLoading = false;





  constructor() {
    const objLogin = JSON.parse(localStorage.getItem('laboral.ai')!);
    this.vNombreUsuario = objLogin.user.nombres_completo;
    this.arr_mensajes = [
      {
        usuario: 'Chatbot',
        msg:
          'Hola 😃 ' +
          this.vNombreUsuario +
          ', te ayudaremos a crear tu empleo para ello te haremos una serie de preguntas.        ¿Estás listo para comenzar? necesito que me confirmes. <br> 1. Sí, quiero publicar un empleo <br>2. No',
      },
    ];
  }
  ngAfterViewChecked(): void {
  this.scrollToBottom();  
  }
  ngOnInit(): void {}

  scrollToBottom(): void {    
    
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {console.log('error scrol', err);
    }
  }

  enviarMsg(value: string) {
    //Agregamos la respuesta al chat
    this.arr_mensajes.push({
      usuario: this.vNombreUsuario,
      msg: value,
    });
    this.inputText = '';

    if (this.bolConfirmacion) {
      this.arrRespuestas.push(value);
      this.arrPreguntas[this.contPreg - 1].resp = value;
      this.dataChat.emit(this.arrPreguntas);
      console.log(this.arrPreguntas);
    }

    // validacion si no responde SI para inicia
    if (!this.bolConfirmacion) {
      if (
        value.toUpperCase().includes('SI') ||
        value.toUpperCase().includes('OK') ||
        value.toUpperCase().includes('EMPECEMOS') ||
        value.toUpperCase().includes('VAMOS')
      ) {
        this.bolConfirmacion = true;
        // return;
      } else {
        setTimeout(() => {
          this.arr_mensajes.push({
            usuario: this.vNombreChatBot,
            msg: 'Si quieres comenzar la publicacion respondeme con un SI por favor, en todo caso podemos comenzar en otro momento',
          });
        }, 2000);
        return;
      }
    }

    // validacion, si llego al final de preguntas emite todo
    if (this.arrPreguntas.length == this.contPreg) {
      this.arrPreguntas.push({
        preg: '¿Cual es la modalidad?',
        resp: 'Presencial',
        tipo: 'texto',
        preview: 'Modalidad',
        edicion: false,
      });
      this.dataChat.emit(this.arrPreguntas);

      this.arr_mensajes.push({
        usuario: this.vNombreChatBot,
        msg: 'un momento por favor, estamos procesando la información para generar la vista previa y puedas confirmar los datos para publicar el empleo.',
      });
      this.scrollToBottom();
      this.renderer.selectRootElement('#txtMsg').focus();

      this.bolLoading = true;
      setTimeout(() => {
        this.bolLoading = false;
        this.dataChat.emit(this.arrPreguntas);
      }, 2000);
      return;
    }

    this.bolLoading = true;
    
    setTimeout(() => {
      this.bolLoading = false;
      this.arr_mensajes.push({
        usuario: this.vNombreChatBot,
        msg: this.arrPreguntas[this.contPreg].preg,
      });
      this.contPreg++;
      // this.scrollToBottom();
    }, 1500);
    
    this.renderer.selectRootElement('#txtMsg').focus();
    
  }
}
