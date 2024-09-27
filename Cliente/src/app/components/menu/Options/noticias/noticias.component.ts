import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css']
})
export class NoticiasComponent {
  noticias: any[] = [];
  titulo: string = '';
  contenido: string = '';
  imagen: string = '';
  mostrarFormulario: boolean = false; // Controla la visibilidad del formulario

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.cargarNoticias();
  }

  cargarNoticias() {
    this.http.get<any[]>('http://localhost:3000/noticias').subscribe(data => {
      this.noticias = data; // Carga las noticias desde el servidor
    });
}


  agregarNoticia() {
    const nuevaNoticia = { titulo: this.titulo, contenido: this.contenido, imagen: this.imagen };
    this.http.post('http://localhost:3000/noticias', nuevaNoticia).subscribe(() => {
      this.snackBar.open('Noticia agregada exitosamente', 'Cerrar', { duration: 3000 });
      this.cargarNoticias();
      this.limpiarCampos();
      this.mostrarFormulario = false; // Ocultar el formulario después de agregar
    }, error => {
      console.error('Error al agregar noticia:', error); // Agregar log para depuración
    });
  }

  eliminarNoticia(id: number) {
    this.http.delete(`http://localhost:3000/noticias/${id}`).subscribe(() => {
      this.snackBar.open('Noticia eliminada exitosamente', 'Cerrar', { duration: 3000 });
      this.cargarNoticias();
    });
  }

  limpiarCampos() {
    this.titulo = '';
    this.contenido = '';
    this.imagen = '';
  }

}