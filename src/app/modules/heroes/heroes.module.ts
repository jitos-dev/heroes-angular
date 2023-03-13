import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AltaComponent } from './pages/alta/alta.component';
import { HomeHeroesComponent } from './pages/home/home-heroes.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { MaterialModule } from '../../shared/material/material.module';
import { HeroesRoutingModule } from './heroes-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { DialogComponent } from '../../shared/components/dialog/dialog.component';

@NgModule({
  declarations: [
    AltaComponent,
    HomeHeroesComponent,
    ListadoComponent,
    SearchComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HeroesRoutingModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  exports: [HomeHeroesComponent]
})
export class HeroesModule { }
