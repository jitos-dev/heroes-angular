import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeHeroesComponent } from './pages/home/home-heroes.component';

const routes: Routes = [
  {
    path: '',
    component: HomeHeroesComponent
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }