import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-mg',
  templateUrl: './chat-mg.component.html',
  styleUrls: ['./chat-mg.component.scss'],
})
export class ChatMgComponent implements OnInit, OnDestroy {
  vNombreUsuario = '';
  vNombreChatBot = 'Chatbot';
  inputText = '';
  arr_mensajes = [{ usuario: '', msg: '' }];

  constructor() {
    const objLogin = JSON.parse(localStorage.getItem('laboral.ai')!);
    this.vNombreUsuario = objLogin.user.nombres_completo;
    this.arr_mensajes = [
      {
        usuario: this.vNombreChatBot,
        msg: `Hola 😃 luciana, 
        te quería comentar que actualmente me encuentro dirigiendo un proceso de selección para la empresa Farmacias Peruana, 
        el puesto es de UX Designer/Researcher. He visto tu perfil y creo que encajarías muy bien con lo solicitado para el puesto.
        `,
      },
    ];
  }
  ngOnDestroy(): void {}
  ngOnInit(): void {
    this.cargarMensajes();
    this.cargarPublicaciones();
  }

  cargarMensajes() {}
  cargarPublicaciones() {}
  cargarPostulantesPorPublicacion(idJob:number) {
    
  }

  handleChange(event:any){
    console.log('evnto',event.value);
    this.cargarPostulantesPorPublicacion(event.value);
  }

  enviarMsg(value: string) {
    this.arr_mensajes.push({
      usuario: this.vNombreChatBot,
      msg: value,
    });
  }

}
