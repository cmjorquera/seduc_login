  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { ModalController, AlertController } from '@ionic/angular';
  import { ModalAgregarUsuarioPage } from '../modal-agregar-usuario/modal-agregar-usuario.page';

  @Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
  })
  export class LoginPage implements OnInit {
    mdl_user: string = '';
    mdl_pass: string = '';
    showPassword: boolean = false; // Controla si la contraseña se muestra o no
    visibleLoading: boolean = false;
    visibleWarning: boolean = false;
    warningMessage: string = '';

    constructor(private router: Router, private modalController: ModalController, private alertController: AlertController) {}

    ngOnInit() {}

    // Función para mostrar advertencia por 3 segundos
    mostrarAdvertencia(mensaje: string) {
      this.warningMessage = mensaje;
      this.visibleWarning = true;
      setTimeout(() => {
        this.visibleWarning = false;
      }, 3000); // 3 segundos
    }

    // Función para redirigir al formulario de cambio de contraseña
    irCambiarPassword() {
      if (this.mdl_user.trim() === '') {
        this.mostrarAdvertencia('Ingrese un nombre de usuario');
        return;
      }
    
      const users = JSON.parse(localStorage.getItem('usuarios') || '[]');
      const user = users.find((u: any) => u.nombreUsuario === this.mdl_user);
    
      if (this.mdl_user === 'cristian' || user) {
        // Redirigir a cambiar-password con el nombre de usuario
        this.router.navigate(['/cambiar-password'], { queryParams: { nombreUsuario: this.mdl_user } });
      } else {
        this.mostrarAdvertencia('Usuario no existe en la base de datos');
      }
    }
    

    // Alternar visibilidad de la contraseña
    visualizarClave() {
      this.showPassword = !this.showPassword;
    }

    ingresar() {
      if (this.mdl_user.trim() === '' || this.mdl_pass.trim() === '') {
        this.mostrarAdvertencia('Por favor, completa todos los campos');
        return;
      }
    
      this.visibleLoading = true;
      this.visibleWarning = false;
    
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('usuarios') || '[]');
        const user = users.find((u: any) => u.nombreUsuario === this.mdl_user && u.password === this.mdl_pass);
    
        // Verificar si el usuario es 'cristian' y tiene la nueva contraseña almacenada en localStorage
        const cristianPassword = localStorage.getItem('cristianPassword');
    
        if ((this.mdl_user === 'cristian' && this.mdl_pass === (cristianPassword || '123456')) || user) {
          // Almacenar el nombre de usuario (para mostrarlo en la página principal)
          localStorage.setItem('nombreUsuario', this.mdl_user);
          
          // Redirigir a la página principal
          this.router.navigate(['/principal']);
        } else {
          this.mostrarAdvertencia('Credenciales inválidas');
        }
    
        this.visibleLoading = false;
      }, 1000);
    }
    
    
    // Mostrar modal para agregar un nuevo usuario
    async presentModal() {
      const modal = await this.modalController.create({
        component: ModalAgregarUsuarioPage,
      });
      return await modal.present();
    }
  }
