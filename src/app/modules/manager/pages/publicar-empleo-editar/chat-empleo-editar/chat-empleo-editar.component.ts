import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-chat-empleo-editar',
  templateUrl: './chat-empleo-editar.component.html',
  styleUrls: ['./chat-empleo-editar.component.scss']
})
export class ChatEmpleoEditarComponent {

  @ViewChild('target')
  private myScrollContainer!: ElementRef;

inputText='';


  scrollToElement(el:any): void {
    this.myScrollContainer.nativeElement.scroll({
      top: this.myScrollContainer.nativeElement.scrollHeight,
      left: 0,
      behavior: 'smooth'
    });
  }
  

  arr_mensajes = [
    {
    usuario:'Chatbot',
    msg:'Hola 😃 (nombre), te ayudaremos a crear tu empleo para ello te haremos una serie de preguntas.        ¿Estás listo para comenzar? necesito que me confirmes. <br> 1. Sí, quiero publicar un empleo <br>2. No'
  },
  {
    usuario:'carlos',
    msg:'esta bien, empecemos'
  }
]


enviarMsg(value:string){
  this.arr_mensajes.push(
    {
      usuario:'carlos',
      msg:value
    }
  );

  this.inputText = '';

  this.myScrollContainer.nativeElement.scroll({
    top: this.myScrollContainer.nativeElement.scrollHeight,
    left: 0,
    behavior: 'smooth'
  });

}

}
