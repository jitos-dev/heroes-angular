import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeHeroesComponent } from './modules/heroes/pages/home/home-heroes.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'heroes',
    loadChildren: () => import("./modules/heroes/heroes.module").then(m => m.HeroesModule)
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
