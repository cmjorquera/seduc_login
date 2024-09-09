import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ModalAgregarUsuarioPageRoutingModule } from './modal-agregar-usuario-routing.module';
import { ModalAgregarUsuarioPage } from './modal-agregar-usuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalAgregarUsuarioPageRoutingModule
  ],
  declarations: [ModalAgregarUsuarioPage]
})
export class ModalAgregarUsuarioPageModule {}
