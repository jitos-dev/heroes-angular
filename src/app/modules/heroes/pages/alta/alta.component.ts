import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HeroeModel } from '../../../../core/models/heroe.model';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.css']
})
export class AltaComponent implements OnInit {

  superheroForm: FormGroup = new FormGroup({})
  heroe: HeroeModel = {
    id: '',
    superhero: '',
    publisher: '',
    alter_ego: '',
    first_appearance: '',
    characters: ''
  }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    //inicializamos el formulario para que tenga los campos de heroe
    this.superheroForm = this.formBuilder.group(this.heroe)

    //de esta forma lo hacemos para editar
    /*     this.superheroForm = this.fb.group({
      id: ['dc-batman'],
      superhero: ['Batman'],
      publisher: ['DC Comics'],
      alter_ego: ['Bruce Wayne'],
      first_appearance: ['Detective Comics #27'],
      characters: ['Bruce Wayne']
    }); */
  }

}
