import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router'; // Asegúrate de importar el Router

@Component({
  selector: 'app-modal-agregar-usuario',
  templateUrl: './modal-agregar-usuario.page.html',
  styleUrls: ['./modal-agregar-usuario.page.scss'],
})
export class ModalAgregarUsuarioPage {

  nombreUsuario: string = '';
  correoUsuario: string = '';
  password: string = '';
  confirmPassword: string = '';
  imageUrl: string = 'assets/imagenes/sin_imagen.jpg';

  errorMessage: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(private modalController: ModalController, private router: Router) {} // Inyectar Router


    // Función para alternar la visibilidad de la contraseña
    visualizarClave() {
      this.showPassword = !this.showPassword;
    }
  
    // Función para alternar la visibilidad de la confirmación de la contraseña
    visualizarConfirmarClave() {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  // Función para cerrar el modal
  dismissModal() {
    this.modalController.dismiss();
  }

  // Función para agregar el usuario
  agregarUsuario() {
    // Limpiar mensaje de error antes de las validaciones
    this.errorMessage = '';
  
    // Validar que todos los campos estén llenos
    if (this.nombreUsuario.trim() === '' || this.correoUsuario.trim() === '' || 
        this.password.trim() === '' || this.confirmPassword.trim() === '') {
      this.errorMessage = 'Por favor, completa todos los campos.';
      // Limpiar mensaje de error después de 3 segundos
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
      return;
    }
  
    // Verificar si las contraseñas coinciden
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      // Limpiar mensaje de error después de 3 segundos
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
      return;
    }
  
    // Guardar las credenciales en localStorage
    const users = JSON.parse(localStorage.getItem('usuarios') || '[]');
    users.push({
      nombreUsuario: this.nombreUsuario,
      password: this.password,
      correoUsuario: this.correoUsuario
    });
    localStorage.setItem('usuarios', JSON.stringify(users));
  
    // Cerrar el modal después de agregar el usuario
    this.dismissModal();
  }

  // Función para seleccionar una imagen
  selectImage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*'; // Solo permitir imágenes
    input.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          this.imageUrl = reader.result as string; // Asignar la URL de la imagen
        };
        reader.readAsDataURL(file); // Leer la imagen como Data URL
      }
    };
    input.click(); // Simular clic en el input
  }

  // Función para volver al login
  volverAlLogin() {
    this.dismissModal(); // Cerrar el modal
    this.router.navigate(['/login']); // Redirigir al login
  }

  // Función para navegar a otra página
  async navigateTo(page: string) {
    await this.dismissModal(); // Cerrar el modal primero
    this.router.navigate([`/${page}`]);
  }

  // Función para cerrar sesión
  async cerrarSesion() {
    await this.dismissModal(); // Cerrar el modal primero
    // Lógica para cerrar sesión
    localStorage.removeItem('nombreUsuario');
    this.router.navigate(['/login']);
  }
}
