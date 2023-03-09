import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HeroeModel, Publisher } from '../../../../core/models/heroe.model';
import { DataApiService } from 'src/app/core/services/data-api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { ListadoComponent } from '../listado/listado.component';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.css']
})
export class AltaComponent implements OnInit {

  isChargeComponent: boolean = false
  component!: ComponentRef<ListadoComponent>

  superheroForm: FormGroup = new FormGroup({})
  heroe: HeroeModel = {
    superhero: '',
    publisher: Publisher.NotValue,
    alter_ego: '',
    first_appearance: '',
    characters: []
  }

  //array con los valores del enum. Si quisieramos las claves sería Object.keys(Publisher)
  publishers = Object.values(Publisher)

  constructor(
    private dataApi: DataApiService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef) { }

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

      this.dataApi.addHeroe(this.heroe).subscribe({
        next: (response) => {
          this.openSnackBar(`Superheroe ${response.superhero} añadido correctamente`)

          //reseteamos los valores del formulario
          this.resetValuesForm()

          //recargamos de nuevo la lista de heroes
          this.loadListHeroes()

        },
        error: (error) => {
          const title: string = "Ha ocurrido un error al guardar el superheroe"
          const body: string = JSON.stringify(error)
          this.openDialog(title, body)
        }
        //si esta correcto que muestre el toolbar de que esta correcto
      })

    }
  }

  /**Este método recarga la lista de heroes debajo del formulario refrescándose cada vez que introducimos uno */
  loadListHeroes() {

    //si ya está inicializado lo destruimos para que se recarguen los nuevos datos
    if (this.component) {
      this.component!.destroy()
    }

    //componente del Listado
    const listadoComponent: ComponentFactory<ListadoComponent> = this.componentFactoryResolver.resolveComponentFactory(ListadoComponent);
    this.component = this.viewContainerRef.createComponent(listadoComponent);
  }

  openSnackBar(message: string): void {
    this.snackBar.open(
      message,
      "Aceptar",
      {
        duration: 3000
      }
    )
  }

  openDialog(title: string, body: string): void {
    this.dialog.open(
      DialogComponent,
      {
        data: {
          title: title,
          body: body
        }
      })
  }

  resetValuesForm(): void {
    this.superheroForm.reset()

    //para quitar los errores de los FormControl al hacer reset()
    for (const controlName in this.superheroForm.controls) {
      const control = this.superheroForm.controls[controlName];
      control.setErrors(null);
    }
  }

}
