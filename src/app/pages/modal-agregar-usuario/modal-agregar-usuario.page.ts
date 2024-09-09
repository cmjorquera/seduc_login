import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-agregar-usuario',
  templateUrl: './modal-agregar-usuario.page.html',
  styleUrls: ['./modal-agregar-usuario.page.scss'],
})
export class ModalAgregarUsuarioPage {

  nombreUsuario: string = '';   // Variable para el nombre del usuario
  correoUsuario: string = '';   // Variable para el correo electrónico del usuario
  password: string = '';        // Variable para la contraseña
  confirmPassword: string = ''; // Variable para repetir la contraseña
  imageUrl: string = 'assets/imagenes/sin_imagen.jpg'; // URL de la imagen predeterminada

  // Variables para los mensajes de error
  errorMessage: string = '';

  constructor(private modalController: ModalController) {}

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
      return;
    }

    // Verificar si las contraseñas coinciden
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
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
}
