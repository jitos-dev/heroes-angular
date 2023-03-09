import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FilterValue, HeroeModel } from 'src/app/core/models/heroe.model';
import { TransformDataPipe } from 'src/app/modules/heroes/pipes/transform-data.pipe';
import { DataApiService } from 'src/app/core/services/data-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { EmitterService } from '../../../../shared/services/emitters.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  displayedColumns: string[] = ['id', 'superhero', 'publisher', 'alter-ego', 'first-appearance', 'characters', 'editar', 'borrar'];
  dataSource: MatTableDataSource<HeroeModel> = new MatTableDataSource();
  fieldsSearch = Object.values(FilterValue)
  isPageAlta: boolean = false
  idHero!: string

  constructor(
    private dataApi: DataApiService,
    private transformData: TransformDataPipe,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private emitterService: EmitterService
  ) { }

  ngOnInit(): void {
    //llamamos a getData() para que refresque por si hay cambios
    this.getData()

    this.emitterDeleteHeroe()
    //si se carga cuando cargamos la lista debajos del formulario de nuevo heroe
    //this.isPageAlta = (this.router.url.includes("alta")) ? true : false
  }

  getData() {
    this.dataApi.getAllHeroes$().subscribe(response => {
      //response es un array de HeroeModel
      this.dataSource.data = this.transformData.transform(response);
    })
  }

  editHeroe(event: Event, idHeroe: string) {
    console.log('editando', idHeroe);
    this.router.navigateByUrl('http://localhost:4200/heroes/alta')
  }

  deleteHeroe(event: Event, idHeroe: string): void {
    this.openDialog(`Va a eliminar el heroe ${idHeroe}`, "¿Estas seguro?")

    //asignamos el valor del id del heroe que quiere eliminar
    this.idHero = idHeroe
  }

  emitterDeleteHeroe(): void {
    //nos subscribimos por si pulsa en el botón de eliminar del dialog.component
    this.emitterService.eventClickDeleteHeroe.subscribe(response => {

      //si ha pulsado en eliminar response es true
      if (response) {
        this.dataApi.deleteHeroe(this.idHero).subscribe({
          next: (resp => {
            //volvemos a cargar los datos para que estén actualizados con el elemento borrado
            this.getData()
          }),
          error: (err => {

          })
        })
      }
    })
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

  /*   searchBy(event: Event, field: string) {
  
      //palabra por la que queremos filtrar que la recogemos del imput del html
      const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
  
      //si quiere filtrar por superhero
      if (field == 'superhero') {
        //aplicamos un filtro a dataSource para en este caso filtrar solo por el campo superhero
        this.dataSource.filterPredicate = (data: HeroeModel, filter: string) => {
          return data.superhero.trim().toLowerCase().includes(filter);
        }
  
        //aplicamos el filtro a dataSource
        //this.dataSource.filter = filterValue
  
        //si quiere filtrar por id
      } else if (field == 'id') {
        //aplicamos un filtro a dataSource para en este caso filtrar solo por el campo superhero
        this.dataSource.filterPredicate = (data: HeroeModel, filter: string) => {
          return data.id.trim().toLowerCase().includes(filter);
        }
  
        //aplicamos el filtro a dataSource
        //this.dataSource.filter = filterValue
  
  
        //si no filtramos por todos los campos
      } else {
        this.dataSource.filter = filterValue.trim().toLowerCase()
      }
    } */

}
