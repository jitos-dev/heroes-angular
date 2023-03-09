import { Component, Input, OnInit } from '@angular/core';
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
  }

  deleteHeroe(event: Event, idHeroe: string): void {
    this.openDialog(`Va a eliminar el heroe ${idHeroe}`, "¿Estas seguro?", true)

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
            this.openDialog("Upss un herror ha ocurrido", JSON.stringify(err), false)
          })
        })
      }
    })
  }

  openDialog(title: string, body: string, pageDelete: boolean): void {
    this.dialog.open(
      DialogComponent,
      {
        data: {
          title: title,
          body: body,
          pageDelete: pageDelete
        }
      })
  }

}
