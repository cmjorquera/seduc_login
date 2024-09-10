import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController, AlertController } from '@ionic/angular';
import{ ModalAgregarUsuarioPage } from '../modal-agregar-usuario/modal-agregar-usuario.page';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  mdl_user: string = '';
  mdl_pass: string = '';
  showPassword: boolean = false; // Controlar si la contraseña se muestra o no
  visibleLoading: boolean = false;
  visibleWarning: boolean = false;
  warningMessage: string = '';


  constructor(private router: Router, private modalController: ModalController, private alertController: AlertController) {}

  ngOnInit() {}
  // Función para redirigir al formulario de cambio de contraseña
  irCambiarPassword() {
    // Verificar si el campo de usuario está vacío
    if (this.mdl_user.trim() === '') {
      this.warningMessage = 'Debe ingresar el nombre de usuario para recuperar la contraseña.';
      this.visibleWarning = true;
    } else {
      // Redirigir a la página de cambiar contraseña pasando el nombre de usuario
      this.router.navigate(['/cambiar-password'], { queryParams: { nombreUsuario: this.mdl_user } });
    }
  }
  // Alternar visibilidad de la contraseña
  visualizarClave() {
    this.showPassword = !this.showPassword;
  }

  ingresar() {
    if (this.mdl_user.trim() === '' || this.mdl_pass.trim() === '') {
      this.warningMessage = 'Por favor, completa todos los campos';
      this.visibleWarning = true;
      return;
    }
  
    this.visibleLoading = true;
    this.visibleWarning = false;
  
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('usuarios') || '[]');
      const user = users.find((u: any) => u.nombreUsuario === this.mdl_user && u.password === this.mdl_pass);
  
      // Verificar si es el usuario con las credenciales especiales o si existe en localStorage
      if ((this.mdl_user === 'cristian' && this.mdl_pass === '123456') || user) {
        // Almacenar el nombre de usuario (para mostrarlo en la página principal)
        localStorage.setItem('nombreUsuario', this.mdl_user);
        
        // Redirigir a la página principal
        this.router.navigate(['/principal']);
      } else {
        this.warningMessage = 'Credenciales inválidas';
        this.visibleWarning = true;
      }
  
      this.visibleLoading = false;
    }, 1000);
  }
  
  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalAgregarUsuarioPage
    });
    return await modal.present();
  }
}
