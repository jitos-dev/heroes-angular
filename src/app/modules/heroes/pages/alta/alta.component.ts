import { Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit, ViewContainerRef, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HeroeModel, Publisher } from '../../../../core/models/heroe.model';
import { DataApiService } from 'src/app/core/services/data-api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { ListadoComponent } from '../listado/listado.component';
import { EmitterService } from 'src/app/shared/services/emitters.service';

@Component({
  selector: 'app-alta',
  templateUrl: './alta.component.html',
  styleUrls: ['./alta.component.css']
})
export class AltaComponent implements OnInit {

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

  /**Esta variable viene de dialog.component.html que se la paso desde listado.component.ts porque
   * es desde este componente cuando pincha en editar y cuando recojo el valor se lo paso en la etiqueta.
   */
  @Input() idHeroe!: string

  constructor(
    private dataApi: DataApiService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private emitterService: EmitterService) { }

  superhero: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)])
  publisher: FormControl = new FormControl(null, Validators.required)  //hay que pasarle los valores por defecto
  alter_ego: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)])
  first_appearance: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)])
  characters: FormControl = new FormControl('', [Validators.required, Validators.minLength(3)])

  ngOnInit(): void {
    this.editHeroe()

    this.addControls()
  }

  addControls(): void {
    //añadimos los FormControl al FormGroup para que recoja los errores y podamos validarlo más facil
    this.superheroForm.addControl('superhero', this.superhero)
    this.superheroForm.addControl('publisher', this.publisher)
    this.superheroForm.addControl('alter_ego', this.alter_ego)
    this.superheroForm.addControl('first_appearance', this.first_appearance)
    this.superheroForm.addControl('characters', this.characters)
  }

  //Cuando se pulsa en enviar el formulario
  sendData() {
    //si el formulario tiene errores
    if (!this.superheroForm.valid) {
      return;
    }

    //recogemos los datos del formulario
    this.heroe = this.superheroForm.value

    /**Si idHero tiene valor es porque viene de editar */
    if (this.idHeroe) {

      //le asignamos el id y lo modificamos
      this.heroe.id = this.idHeroe

      this.dataApi.editHeroe(this.heroe)
        .subscribe({
          next: (heroe) => {
            this.openSnackBar(`Superheroe ${heroe.superhero} modificado correctamente`)

            //refrescamos los datos del listado para que aparezca modificado
            this.reloadDataSource()

            this.dialog.closeAll()
          },
          error: (error) => {
            this.openDialog("Error al editar", JSON.stringify(error))
          }
        })

      //ponemos el valor de id a undefined por si luego borra que no tenga valor predefinido
      this.heroe.id = undefined

      return; //no seguimos para que no lo guarde también
    }


    //aqui entra cuando lo que quiere es añadir un nuevo heroe
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


  //para refrescar los datos del listado de heroes cuando hay algún cambio como editar o borrar un heroe
  reloadDataSource(): void {
    this.dataApi.getAllHeroes$().subscribe((list) => {
      this.emitterService.dataSourceEmitter.emit(list)
    })
  }

  editHeroe(): void {
    //solo tendrá valor si viene del formulario de editar
    if (this.idHeroe) {

      //buscamos el heroe que vamos a editar por el id
      this.dataApi.getHeroesById(this.idHeroe).subscribe({
        next: (heroe) => {
          this.heroe = heroe
          this.heroe.id = this.idHeroe

          //asignamos los valores del heroe a los campos del formulario
          this.superhero.setValue(heroe.superhero)
          this.publisher.setValue(heroe.publisher)
          this.alter_ego.setValue(heroe.alter_ego)
          this.first_appearance.setValue(heroe.first_appearance)
          this.characters.setValue(heroe.characters)

        },
        error: (error) => {
          this.openDialog("Ha ocurrido un error, el id de usuario no es válido", JSON.stringify(error))
        }
      })


    }
  }

  /**Este método recarga la lista de heroes debajo del formulario refrescándose cada vez que introducimos uno */
  loadListHeroes() {
    //si ya está inicializado solo recargamos los nuevos datos
    if (this.component) {
      this.reloadDataSource()
      return;
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
