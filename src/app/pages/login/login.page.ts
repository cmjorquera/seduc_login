import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalAgregarUsuarioPage } from '../modal-agregar-usuario/modal-agregar-usuario.page';

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

  constructor(private router: Router, private modalController: ModalController) {}

  ngOnInit() {}

  // Alternar visibilidad de la contraseña
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login() {
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

      if (user) {
        localStorage.setItem('nombreUsuario', this.mdl_user);
        this.router.navigate(['/principal']);
      } else {
        this.warningMessage = 'Credenciales inválidas';
        this.visibleWarning = true;
      }

      this.visibleLoading = false;
    }, 300);
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModalAgregarUsuarioPage
    });
    return await modal.present();
  }
}
