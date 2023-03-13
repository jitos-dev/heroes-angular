import { Component, ComponentRef, OnInit, Input, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
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

  component!: ComponentRef<ListadoComponent> //ver si vale para algo esto

  superheroForm: FormGroup = new FormGroup({})
  heroe: HeroeModel = {
    superhero: '',
    publisher: Publisher.NotValue,
    alter_ego: '',
    first_appearance: '',
    characters: []
  }

  @ViewChild('formulario', { static: false }) miFormulario!: NgForm;

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
    private emitterService: EmitterService,
    private fb: FormBuilder
  ) {


    this.superheroForm = this.fb.group({
      superhero: ['', [Validators.required, Validators.minLength(3)]],
      publisher: ['', [Validators.required, Validators.minLength(3)]],
      alter_ego: ['', [Validators.required, Validators.minLength(3)]],
      first_appearance: ['', [Validators.required, Validators.minLength(3)]],
      characters: ['', [Validators.required, Validators.minLength(3)]],
    })
  }

  ngOnInit(): void {
    //si cuando se carga el componente idHeroe tiene valor es que entra por editar y recargamos los datos
    this.reloadDataInForm()
  }

  //Cuando se pulsa en enviar el formulario
  sendData() {
    //si el formulario tiene errores
    if (!this.superheroForm.valid) {
      return;
    }

    //recogemos los datos del formulario
    this.heroe = this.superheroForm.value

    /**Si idHero tiene valor es porque viene de editar y entramos en este if*/
    if (this.idHeroe) {

      //le asignamos el id y lo modificamos
      this.editHeroe();

      return; //no seguimos para que no lo guarde también
    }

    //Si llega aqui es porque quiere es añadir un nuevo heroe
    this.saveHeroe();
  }


  private saveHeroe() {
    this.dataApi.addHeroe(this.heroe).subscribe({
      next: (response) => {
        this.openSnackBar(`Superheroe ${response.superhero} añadido correctamente`);

        /*Empezamos a emitir para redirigir a '/heroes/todos'
        Lo hago es esta forma y no con router.navigate porque de la forma que yo tengo
        organizados los componentes si llamo a otra ruta que está dentro de esta no me hace
        el redirect y con un emitter lo controlo desde home-heroes.component en la función
        redirecToAll() como si estubiera haciendo click en el nav*/
        this.emitterService.navigateEmitter.emit();

        //este redirect es solo para que cambie la url en el navegador
        this.router.navigate(['heroes/todos']);
      },
      error: (error) => {
        const title: string = "Ha ocurrido un error al guardar el superheroe";
        const body: string = JSON.stringify(error);
        this.openDialog(title, body);
      }
    });
  }

  private editHeroe() {
    this.heroe.id = this.idHeroe;

    this.dataApi.editHeroe(this.heroe)
      .subscribe({
        next: (heroe) => {
          this.openSnackBar(`Superheroe ${heroe.superhero} modificado correctamente`);

          //refrescamos los datos del listado para que aparezca modificado
          this.reloadDataSource();

          this.dialog.closeAll();
        },
        error: (error) => {
          this.openDialog("Error al editar", JSON.stringify(error));
        }
      });

    //ponemos el valor de id a undefined por si luego borra que no tenga valor predefinido
    this.heroe.id = undefined;
  }

  //para refrescar los datos del listado de heroes cuando hay algún cambio como editar o borrar un heroe
  private reloadDataSource(): void {
    this.dataApi.getAllHeroes$().subscribe((list) => {
      this.emitterService.dataSourceEmitter.emit(list)
    })
  }

  //recargamos los datos del formulario si idHeroe tiene valor que es porque entra por editar de la
  //tabla de heroes/todos
  private reloadDataInForm(): void {
    //solo tendrá valor si viene del formulario de editar
    if (this.idHeroe) {

      //buscamos el heroe que vamos a editar por el id
      this.dataApi.getHeroesById(this.idHeroe).subscribe({
        next: (heroe) => {
          this.heroe = heroe
          this.heroe.id = this.idHeroe

          //asignamos los valores del heroe a los campos del formulario
          this.superheroForm.patchValue({
            superhero: heroe.superhero,
            publisher: heroe.publisher,
            alter_ego: heroe.alter_ego,
            first_appearance: heroe.first_appearance,
            characters: heroe.characters
          })

        },
        error: (error) => {
          this.openDialog("Ha ocurrido un error, el id de usuario no es válido", JSON.stringify(error))
        }
      })
    }
  }


  /**
   * Funcion para abrir el SnackBar con el mensaje que pasamos por parámetro
   * @param message string con el mensaje que queremos mostrar
   */
  private openSnackBar(message: string): void {
    this.snackBar.open(
      message,
      "Aceptar",
      {
        duration: 3000
      }
    )
  }

  //Función para abrir el Dialog con datos dinamicos y poder reutilizarlo
  private openDialog(title: string, body: string): void {
    this.dialog.open(
      DialogComponent,
      {
        data: {
          title: title,
          body: body
        }
      })
  }

  /*   resetValuesForm(): void {
      //reseteamos el formulario a sus valores iniciales
      //this.superheroForm.reset(this.initialState)
      this.superheroForm.markAsUntouched()
      this.superheroForm.setErrors(null)
      this.superheroForm.updateValueAndValidity()
  
      //para quitar los errores de los FormControl al hacer reset()
      for (const controlName in this.superheroForm.controls) {
        const control = this.superheroForm.controls[controlName];
        control.setValue("")
        //control.setErrors(null);
        control.markAsUntouched()
        control.updateValueAndValidity()
        //control.reset()
      }
  
      const campos = document.getElementsByClassName('ng-invalid')
      for (let i = 0; i < campos.length; i++) {
        const element = campos[i];
        // Aquí puedes hacer lo que necesites con cada elemento
        element.classList.add('ng-valid')
        element.classList.remove('ng-invalid');
      }
    } */
}
