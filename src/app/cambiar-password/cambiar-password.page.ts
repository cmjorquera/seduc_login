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
    // Validar que ambas contraseñas coincidan
    if (this.nuevaPassword !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    // Buscar el usuario en localStorage y actualizar su contraseña
    const users = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const userIndex = users.findIndex((u: any) => u.nombreUsuario === this.nombreUsuario);

    if (userIndex !== -1) {
      users[userIndex].password = this.nuevaPassword;
      localStorage.setItem('usuarios', JSON.stringify(users));

      // Mensaje de éxito
      this.successMessage = 'Contraseña cambiada exitosamente. Redirigiendo al login...';

      // Redirigir al login después de cambiar la contraseña (después de 2 segundos)
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    } else {
      this.errorMessage = 'El usuario no existe.';
    }
  }

  // Función para volver a la pantalla de login
  volverAlLogin() {
    this.router.navigate(['/login']);
  }
}
