import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { HeroeService } from 'src/app/core/services/heroe.service';
import { ShowNavService } from '../../../../core/services/show-nav.service';

@Component({
  selector: 'app-home',
  templateUrl: './home-heroes.component.html',
  styleUrls: ['./home-heroes.component.css']
})
export class HomeHeroesComponent implements OnInit {

  optionSubMenu!: string

  //esto lo obtenemos del html. La etiqueta que queremos obtener la marcamos con #drawer
  @ViewChild('drawer') drawer!: MatDrawer

  constructor(private heroeService: HeroeService, private showNavService: ShowNavService) { }

  ngOnInit(): void {
    this.checkSubMenu('home')

    this.showNavService.eventClick.subscribe(event => {
      event == true ? this.drawer.open() : this.drawer.close()
    })
  }

  getAllHeroes() {
    this.heroeService.getAllHeroes$()
      .subscribe(response => {
        //esto es un array de heroes
        console.log(response);
      })
  }

  checkSubMenu(option: string) {
    this.optionSubMenu = option
  }
}
