import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AltaComponent } from './pages/alta/alta.component';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';
import { HomeHeroesComponent } from './pages/home/home-heroes.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { ModalComponent } from './pages/modal/modal.component';
import { MaterialModule } from '../../shared/material/material.module';
import { HeroesRoutingModule } from './heroes-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { DialogEditarComponent } from './pages/dialog-editar/dialog-editar.component';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';

@NgModule({
  declarations: [
    AltaComponent,
    BusquedaComponent,
    HomeHeroesComponent,
    ListadoComponent,
    ModalComponent,
    DialogEditarComponent,
    SearchComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HeroesRoutingModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ]
})
export class HeroesModule { }
