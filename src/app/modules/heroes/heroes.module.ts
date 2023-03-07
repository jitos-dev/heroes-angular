import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AltaComponent } from './pages/alta/alta.component';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';
import { DetalleComponent } from './pages/detalle/detalle.component';
import { HomeComponent } from './pages/home/home.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { ModalComponent } from './pages/modal/modal.component';



@NgModule({
  declarations: [
    AltaComponent,
    BusquedaComponent,
    DetalleComponent,
    HomeComponent,
    ListadoComponent,
    ModalComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HeroesModule { }
