import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    characters: []
  }

  constructor() { }

  superhero = new FormControl('', [Validators.required, Validators.minLength(3)])
  publisher = new FormControl('', [Validators.required, Validators.minLength(3)])
  alter_ego = new FormControl('', [Validators.required, Validators.minLength(3)])
  first_appearance = new FormControl('', [Validators.required, Validators.minLength(3)])
  characters = new FormControl('', [Validators.required, Validators.minLength(3)])

  ngOnInit(): void {

    //inicializamos el formulario para que tenga los campos de heroe
    //this.superheroForm = this.formBuilder.group(this.heroe)

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

  sendData() {
    //si esta todo correcto lo guardamos
    if (this.superheroForm.valid) {

      //recogemos los datos del formulario
      this.heroe = this.superheroForm.value


    }
  }

  getErrorMessage() {
    if (this.superhero.hasError('required') ||
      this.publisher.hasError('required') ||
      this.alter_ego.hasError('required') ||
      this.first_appearance.hasError('required') ||
      this.characters.hasError('required')) {
      return 'You must enter a value';
    }

    return this.superheroForm.hasError('email') ? 'Not a valid email' : '';
  }

}
