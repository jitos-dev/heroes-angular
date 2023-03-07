import { Component, OnInit } from '@angular/core';
import { HeroeService } from 'src/app/core/services/heroe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private heroeService: HeroeService) { }

  ngOnInit(): void {
  }

  getAllHeroes() {
    this.heroeService.getAllHeroes$()
      .subscribe(response => {
        //esto es un array de heroes
        console.log(response);
      })
  }
}
