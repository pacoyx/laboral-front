import {
  Component,
  ViewChild,
  ElementRef,
  inject,
  Renderer2,
  Output,
  EventEmitter,
} from '@angular/core';
import { Datachat } from '../../../interfaces/IDatachat';

@Component({
  selector: 'app-chat-empleo-editar',
  templateUrl: './chat-empleo-editar.component.html',
  styleUrls: ['./chat-empleo-editar.component.scss'],
})
export class ChatEmpleoEditarComponent {
  private renderer = inject(Renderer2);
  @ViewChild('target') private myScrollContainer!: ElementRef;
  @Output() dataChat = new EventEmitter<Datachat>();

  inputText = '';
  arr_mensajes = [
    {
      usuario: 'Chatbot',
      msg: 'Hola 😃 (nombre), te ayudaremos a crear tu empleo para ello te haremos una serie de preguntas.        ¿Estás listo para comenzar? necesito que me confirmes. <br> 1. Sí, quiero publicar un empleo <br>2. No',
    },
  ];

  arrPreguntas = [
    '¿Cual es el nombre del empleo?',
    '¿Puedes hacer una breve descripcion del trabajo a realizar?',
    '¿Cuales son las funciones que va realizar? (separa cada funcion con un punto)',
    '¿Puedes decirme los conocimientos y/o requisitos que se deben tener? (separa cada funcion con un punto)',
    'Indica el número de vacantes que solicitas para el empleo',
    '¿Cual es la localidad para trabajo?',
    '¿Cuanto es el salario para el puesto?',
    '¿Cual es la fecha estimada para el inicio del trabajo? (yyyy-mm-dd)',
  ];
  arrPreguntasPreview = [
    'Titulo del empleo',
    'Descripción del puesto',
    'Funciones',
    'Conocimientos',
    'Vacantes',
    'Localidad / lugar de trabajo',
    'Salario mensual',
    'Fecha de inicio',
  ];
  arrRespuestas: string[] = [];
  contPreg = 0;
  bolConfirmacion = false;
  bolLoading = false;

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop =
        this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }

  enviarMsg(value: string) {
    this.arr_mensajes.push({
      usuario: 'carlos',
      msg: value,
    });
    this.inputText = '';

    if (this.bolConfirmacion) {
      this.arrRespuestas.push(value);
    }

    if (!this.bolConfirmacion) {
      if (value.toUpperCase().includes('SI')) {
        this.bolConfirmacion = true;
      } else {
        setTimeout(() => {
          this.arr_mensajes.push({
            usuario: 'Chatbot',
            msg: 'ok, entiendo, puedes comenzar con el proceso despues.',
          });
        }, 2000);

        return;
      }
    }

    if (this.arrPreguntas.length == this.arrRespuestas.length) {
      this.arr_mensajes.push({
        usuario: 'Chatbot',
        msg: 'un momento por favor, estamos procesando la informacion para generar la vista previa y puedas confirmar los datos para publicar el empleo.',
      });
      this.scrollToBottom();
      this.renderer.selectRootElement('#txtMsg').focus();

      this.bolLoading = true;
      setTimeout(() => {
        this.bolLoading = false;
        this.dataChat.emit({
          preguntas: this.arrPreguntasPreview,
          respuestas: this.arrRespuestas,
        });
      }, 2000);
      return;
    }

    this.bolLoading = true;
    setTimeout(() => {
      this.bolLoading = false;
      this.arr_mensajes.push({
        usuario: 'Chatbot',
        msg: this.arrPreguntas[this.contPreg],
      });
      this.contPreg++;
      this.scrollToBottom();
    }, 2000);

    this.renderer.selectRootElement('#txtMsg').focus();
  }
}
