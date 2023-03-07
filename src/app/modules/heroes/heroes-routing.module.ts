import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeHeroesComponent } from './pages/home/home-heroes.component';
import { ListadoComponent } from './pages/listado/pages/listado.component';
import { AltaComponent } from './pages/alta/alta.component';

const routes: Routes = [
  {
    path: '',
    component: HomeHeroesComponent
  },
  {
    path: 'todos',
    loadChildren: () => import('./pages/listado/listado.module').then(m => m.ListadoModule)
  },
  {
    path: 'alta',
    component: AltaComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }