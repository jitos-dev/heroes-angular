import { Component, OnInit } from '@angular/core';
import { HeroeService } from './core/services/heroe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  optionMenu!: string

  constructor(private heroeService: HeroeService) { }

  ngOnInit(): void {
    this.getData()
  }

  checkMenu(option: string): void {
    this.optionMenu = option
  }

  getData() {
    this.heroeService.getAllHeroes$()
      .subscribe(response => {
        //esto es un array de heroes
        console.log(response);
      })
  }
}
