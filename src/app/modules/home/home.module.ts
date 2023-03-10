import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { MaterialModule } from '../../shared/material/material.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HeroesRoutingModule } from '../heroes/heroes-routing.module';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
    HeroesRoutingModule
  ]
})
export class HomeModule { }
