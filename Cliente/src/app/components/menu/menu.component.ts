import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { SidebarService } from '../menu/Options/Services/sidebar.services';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  // Estado de las vistas
  isSidebarHidden = false;
  showSearch = false;
  showNewBooks = false;
  showMultas = false;
  showRegistroBibliotecarios = false; // Cambia showRegistro por un nombre específico
  isDropdownVisible = false;
  showLectores = false;
  showReporte = false;
  isFooterVisible = false;
  showNoticias = false;
  showDevolucionDeLibros = false;
  showGestionNoticias = false; // Nueva variable específica para gestionar noticias
  noticiasItems: any[] = [];
  private intervalId: any;

  constructor(private sidebarService: SidebarService, private http: HttpClient, private router: Router) {
    this.sidebarService.sidebarHidden$.subscribe(hidden => this.isSidebarHidden = hidden);
  }

  ngOnInit() {
    this.cargarNoticias();
    this.iniciarDesplazamiento();
    this.showCarruselNoticias(); // Muestra el carrusel de noticias al iniciar
  }

  ngOnDestroy() {
    clearInterval(this.intervalId); // Limpia el intervalo
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
  showSearchBooks() {
    this.resetViews();
    this.showSearch = true;
  }

  showNewBook() {
    this.resetViews();
    this.showNewBooks = true;
  }

  showMulta() {
    this.resetViews();
    this.showMultas = true;
  }

  showRegistroBlibliotecarios() {
    this.resetViews();
    this.showRegistroBibliotecarios = true;
  }

  showRegistroLectores() {
    this.resetViews();
    this.showLectores = true;
  }

  showPersonalisado() {
    this.resetViews();
    this.showReporte = true;
  }

  showGestionarNoticias() {
    this.resetViews();
    this.showGestionNoticias = true; // Controla el componente de gestión de noticias
    this.cargarNoticias();
  }
showCarruselNoticias() {
  this.resetViews(); // Resetea otras vistas
  this.showNoticias = true; // Muestra el carrusel de noticias
}


  mostrarDevolucionDeLibros() {
    this.resetViews();
    this.showDevolucionDeLibros = true; // Cambia a true para mostrar el componente
  }

  verEventosCercanos() { // Nuevo método para redirigir al mapa
    this.resetViews(); // Asegúrate de que se llame a resetViews aquí
    this.router.navigate(['/mapa']); // Asegúrate de que la ruta '/mapa' esté configurada en tu enrutador
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  closeDropdown() {
    this.isDropdownVisible = false;
  }

  logout() {
    localStorage.removeItem('token'); // Elimina el token de localStorage
    this.router.navigate(['/home']); // Redirige a la página de inicio de sesión
  }

// Método para resetear las vistas
private resetViews() {
  this.showNoticias = false;
  this.showSearch = false;
  this.showNewBooks = false;
  this.showMultas = false;
  this.showRegistroBibliotecarios = false; // Cambiado para bibliotecarios
  this.showLectores = false;
  this.showReporte = false;
  this.showDevolucionDeLibros = false;
  this.showGestionNoticias = false; // Asegúrate de resetear esta vista también
}

@HostListener('window:scroll', [])
onWindowScroll() {
  const windowHeight = window.innerHeight || document.documentElement.offsetHeight;
  const docHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
  const windowBottom = windowHeight + window.pageYOffset;
  this.isFooterVisible = windowBottom >= docHeight;
}

private cargarNoticias() {
  this.http.get<any[]>('http://localhost:3000/noticias').subscribe(data => {
    this.noticiasItems = data;
  }, error => {
    console.error('Error al cargar noticias:', error);
  });
}

private iniciarDesplazamiento() {
  this.intervalId = setInterval(() => {
    const carousel = document.querySelector('.noticias-carousel') as HTMLElement;
    if (carousel) {
      carousel.scrollBy({ left: 400, behavior: 'smooth' });
    }
  }, 3000);
}
}