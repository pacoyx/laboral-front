import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IListaEmpleos } from '../../interfaces/IListaEmpleos';

@Component({
  selector: 'app-publicar-empleo-mg',
  templateUrl: './publicar-empleo-mg.component.html',
  styleUrls: ['./publicar-empleo-mg.component.scss'],
})
export class PublicarEmpleoMgComponent {
  private router = inject(Router);

  bol_detalle = false;
  empleoDetalle!: IListaEmpleos;

  arrEmpleos: IListaEmpleos[] = [
    {
      id:1,
      img: '',
      titulo:
        'Programador Jr .Net Core full stack testing backend fronted relacionado con base de datos',
      modalidad: 'remoto',
      descripcion:
        'Hola, somos Laboral.ai, startup que a través de inteligencia artificial apoya a estudiantes a encajar con trabajos altamente demandados, creando una conexión más rápida con oportunidades laborales que eleven su calidad de vida.      Hemos ganado varios concurso de capital semilla y estamos creciendo, por lo que nos gustaría incorporar a un practicante con muchas ganas de crecer con nosotros para el desarrollo de nuestra plataforma y en todo el proceso de lanzamiento de un producto digital.',
      funciones: [
        'Analizar base de datos',
        'Desarrollar MVP fanto FrontEnd como Backend de acuerdo a requerimientos del backlog',
        'Desarrollar Codigo en PHP, Javascript, WordpressDiseñar base de datos del aplicativo',
        'Utilizar algoritmos de Inteligencia Artificial',
      ],
      conocimientos: [
        'Ingles avanzado',
        'Estudiante y/o egresado de Sistemas, Ciencia de la computación o afines.',
        'Carácter autodidacta, resolutivo, analítico, disciplinado, curioso y con muchos deseos de desarrollo',
        'Conocimientos de programación (Con ganas de desarrollarse como full stack)',
        'Conocimientos básicos de herramientas de prototipado y esquematizado como Figma, Miro, entre otros. (deseable)',
        'Conocimientos básicos de metodologías ágiles (deseable)',
      ],
    },
    {
      id:2,
      img: '',
      titulo: 'Devloper java full stack Azure aws google',
      modalidad: 'presencial',
      descripcion:
        '2 Hola, somos Laboral.ai, startup que a través de inteligencia artificial apoya a estudiantes a encajar con trabajos altamente demandados, creando una conexión más rápida con oportunidades laborales que eleven su calidad de vida.      Hemos ganado varios concurso de capital semilla y estamos creciendo, por lo que nos gustaría incorporar a un practicante con muchas ganas de crecer con nosotros para el desarrollo de nuestra plataforma y en todo el proceso de lanzamiento de un producto digital.',
      funciones: [
        'Desarrollar MVP fanto FrontEnd como Backend de acuerdo a requerimientos del backlog',
        'Desarrollar Codigo en PHP, Javascript, WordpressDiseñar base de datos del aplicativo',
        'Utilizar algoritmos de Inteligencia Artificial',
      ],
      conocimientos: [
        'Ingles intermedio',
        'Estudiante y/o egresado de Sistemas, Ciencia de la computación o afines.',
        'Carácter autodidacta, resolutivo, analítico, disciplinado, curioso y con muchos deseos de desarrollo',
        'Conocimientos de programación (Con ganas de desarrollarse como full stack)',
        'Conocimientos básicos de herramientas de prototipado y esquematizado como Figma, Miro, entre otros. (deseable)',
        'Conocimientos básicos de metodologías ágiles (deseable)',
      ],
    },
    {
      id:3,
      img: '',
      titulo: 'Administrador de azure',
      modalidad: 'hibrido',
      descripcion:
        '3 Hola, somos Laboral.ai, startup que a través de inteligencia artificial apoya a estudiantes a encajar con trabajos altamente demandados, creando una conexión más rápida con oportunidades laborales que eleven su calidad de vida.      Hemos ganado varios concurso de capital semilla y estamos creciendo, por lo que nos gustaría incorporar a un practicante con muchas ganas de crecer con nosotros para el desarrollo de nuestra plataforma y en todo el proceso de lanzamiento de un producto digital.',
      funciones: [
        'Desarrollar desarrollo FrontEnd como Backend de acuerdo a requerimientos del backlog',
        'Desarrollar Codigo en PHP, Javascript, WordpressDiseñar base de datos del aplicativo',
        'analizar y desarrollar el diagrama de clases',
      ],
      conocimientos: [
        'Ingles basico',
        'Estudiante y/o egresado de Sistemas, Ciencia de la computación o afines.',
        'Carácter autodidacta, resolutivo, analítico, disciplinado, curioso y con muchos deseos de desarrollo',
        'Conocimientos de programación (Con ganas de desarrollarse como full stack)',
        'Conocimientos básicos de herramientas de prototipado y esquematizado como Figma, Miro, entre otros. (deseable)',
        'Conocimientos básicos de metodologías ágiles (deseable)',
      ],
    },
  ];

  irNuevoEmpleo() {
    this.router.navigate(['/manager/publicar-editar']);
  }

  verDetalle(empleo:IListaEmpleos) {
    this.bol_detalle = true;
    this.empleoDetalle = empleo;
    // console.log('desde mg empleo ===>', empleo);
    
  }
}
