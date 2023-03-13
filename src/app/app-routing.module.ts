import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/pages/home/home.component';
import { HomeHeroesComponent } from './modules/heroes/pages/home/home-heroes.component';
import { ErrorComponent } from './shared/components/error/error.component';
import { LoginComponent } from './modules/users/pages/login/login.component';
import { RegistroComponent } from './modules/users/pages/registro/registro.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'heroes',
    component: HomeHeroesComponent,
    loadChildren: () => import("./modules/heroes/heroes.module").then(m => m.HeroesModule)
  },
  {
    path: 'users',
    loadChildren: () => import('./modules/users/users.module').then(m => m.UsersModule)
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'error',
    component: ErrorComponent
  },
  {
    path: '**',
    redirectTo: 'error'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
