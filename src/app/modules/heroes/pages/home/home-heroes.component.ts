import { Component, OnInit } from '@angular/core';
import { HeroeService } from 'src/app/core/services/heroe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home-heroes.component.html',
  styleUrls: ['./home-heroes.component.css']
})
export class HomeHeroesComponent implements OnInit {

  optionSubMenu!: string

  constructor(private heroeService: HeroeService) { }

  ngOnInit(): void {
    this.checkSubMenu('home')
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
