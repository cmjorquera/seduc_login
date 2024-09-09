import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';  // Importa el módulo de Ionic

import { LoginPageRoutingModule } from './login-routing.module'; // Importa el módulo de enrutamiento
import { LoginPage } from './login.page'; // Importa el componente de la página de login

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,  // Asegúrate de que este módulo está importado
    LoginPageRoutingModule
  ],
  declarations: [LoginPage]
})
export class LoginPageModule {}
