import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.page.html',
  styleUrls: ['./cambiar-password.page.scss'],
})
export class CambiarPasswordPage implements OnInit {
  nombreUsuario: string = '';   // Variable para el nombre del usuario recibido
  nuevaPassword: string = '';   // Nueva contraseña
  confirmPassword: string = ''; // Confirmar nueva contraseña
  errorMessage: string = '';    // Mensaje de error
  successMessage: string = '';  // Mensaje de éxito

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Obtener el nombre de usuario de los queryParams
    this.route.queryParams.subscribe(params => {
      if (params['nombreUsuario']) {
        this.nombreUsuario = params['nombreUsuario'];
      }
    });
  }

  // Función para cambiar la contraseña
  cambiarPassword() {
    // Limpiar mensajes anteriores
    this.errorMessage = '';
    this.successMessage = '';
  
    // Validar que los campos no estén vacíos
    if (!this.nuevaPassword.trim() || !this.confirmPassword.trim()) {
      this.errorMessage = 'Por favor, complete ambos campos de contraseña.';
      this.autoHideMessage('error');
      return;
    }
  
    // Validar que ambas contraseñas coincidan
    if (this.nuevaPassword !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      this.autoHideMessage('error');
      return;
    }
  
    // Si el usuario es 'cristian', solo actualiza la contraseña en localStorage
    if (this.nombreUsuario === 'cristian') {
      // Guardar la nueva contraseña de 'cristian' en localStorage
      localStorage.setItem('cristianPassword', this.nuevaPassword);
  
      this.successMessage = 'Contraseña cambiada exitosamente para Cristian. Redirigiendo al login...';
      this.autoHideMessage('success');
  
      // Redirigir al login después de cambiar la contraseña
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
  
    } else {
      // Buscar el usuario en localStorage y actualizar su contraseña
      const users = JSON.parse(localStorage.getItem('usuarios') || '[]');
      const userIndex = users.findIndex((u: any) => u.nombreUsuario === this.nombreUsuario);
  
      if (userIndex !== -1) {
        users[userIndex].password = this.nuevaPassword;
        localStorage.setItem('usuarios', JSON.stringify(users));
  
        this.successMessage = 'Contraseña cambiada exitosamente. Redirigiendo al login...';
        this.autoHideMessage('success');
  
        // Redirigir al login después de cambiar la contraseña
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      } else {
        this.errorMessage = 'El usuario no existe.';
        this.autoHideMessage('error');
      }
    }
  }
  
  
  // Función para volver a la pantalla de login
  volverAlLogin() {
    this.router.navigate(['/login']);
  }

  // Función para navegar entre páginas
  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }

  cerrarSesion() {
    // Lógica para cerrar sesión
    localStorage.removeItem('nombreUsuario');
    this.router.navigate(['/login']);
  }

  // Función para ocultar mensajes después de 3 segundos
  autoHideMessage(type: 'error' | 'success') {
    setTimeout(() => {
      if (type === 'error') {
        this.errorMessage = '';
      } else {
        this.successMessage = '';
      }
    }, 3000); // Ocultar el mensaje después de 3 segundos
  }
}
