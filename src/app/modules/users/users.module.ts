import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { EdicionComponent } from './pages/edicion/edicion.component';



@NgModule({
  declarations: [
    RegistroComponent,
    LoginComponent,
    EdicionComponent
  ],
  imports: [
    CommonModule
  ]
})
export class UsersModule { }
