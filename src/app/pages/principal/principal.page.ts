import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {

  nombreUsuario: string = ''; // Variable para almacenar el nombre del usuario

  constructor(private router: Router) {}

  ngOnInit() {
    // Recuperar el nombre de usuario de localStorage
    this.nombreUsuario = localStorage.getItem('nombreUsuario') || 'Invitado';
  }

  // Función para navegar a otras páginas
  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }

  // Función para cerrar sesión
  logout() {
    // Limpiar el localStorage (opcional)
    localStorage.removeItem('nombreUsuario');
    
    // Redirigir al login
    this.router.navigate(['/login']);
  }
}
