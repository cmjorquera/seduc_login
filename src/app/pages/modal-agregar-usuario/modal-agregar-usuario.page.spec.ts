import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalAgregarUsuarioPage } from './modal-agregar-usuario.page';

describe('ModalAgregarUsuarioPage', () => {
  let component: ModalAgregarUsuarioPage;
  let fixture: ComponentFixture<ModalAgregarUsuarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAgregarUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
