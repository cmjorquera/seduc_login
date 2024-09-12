import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage {

  nombreUsuario: string = ''; // Variable para el nombre del usuario

  constructor(private router: Router) {}

  ngOnInit() {
    // Obtener el nombre del usuario desde localStorage o el servicio de autenticación
    this.nombreUsuario = localStorage.getItem('nombreUsuario') || 'Usuario';
  }

  navigateTo(page: string) {
    // Navega a la página solicitada
    this.router.navigate([`/${page}`]);
  }

  cerrarSesion() {
    // Lógica para cerrar sesión
    localStorage.removeItem('nombreUsuario');
    this.router.navigate(['/login']);
  }
}
