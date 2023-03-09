import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HeroeModel, Publisher } from '../../../../core/models/heroe.model';

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
    publisher: Publisher.NotValue,
    alter_ego: '',
    first_appearance: '',
    characters: []
  }

  //array con los valores del enum. Si quisieramos las claves sería Object.keys(Publisher)
  publishers = Object.values(Publisher)

  constructor() { }

  superhero: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)])
  publisher: FormControl = new FormControl(null, Validators.required)  //hay que pasarle los valores por defecto
  alter_ego: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)])
  first_appearance: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)])
  characters: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)])

  ngOnInit(): void {

    //añadimos los FormControl al FormGroup para que recoja los errores y podamos validarlo más facil
    this.superheroForm.addControl('superhero', this.superhero)
    this.superheroForm.addControl('publisher', this.publisher)
    this.superheroForm.addControl('alter_ego', this.alter_ego)
    this.superheroForm.addControl('first_appearance', this.first_appearance)
    this.superheroForm.addControl('characters', this.characters)

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

  //Cuando se pulsa en enviar el formulario
  sendData() {
    //si esta todo correcto lo guardamos
    if (this.superheroForm.valid) {

      //recogemos los datos del formulario
      this.heroe = this.superheroForm.value
      console.log('heroe', this.heroe);

    }
  }

}
