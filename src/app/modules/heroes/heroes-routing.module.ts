import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeHeroesComponent } from './pages/home/home-heroes.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { AltaComponent } from './pages/alta/alta.component';

const routes: Routes = [
  {
    path: '',
    component: HomeHeroesComponent,
    children: [
      {
        path: 'todos',
        component: ListadoComponent
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
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HeroesRoutingModule { }