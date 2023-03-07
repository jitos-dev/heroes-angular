import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HeroeModel } from 'src/app/core/models/heroe.model';
import { HeroeService } from 'src/app/core/services/heroe.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  displayedColumns: string[] = ['id', 'superhero', 'publisher', 'alter-ego', 'first-appearance'];
  dataSource: MatTableDataSource<HeroeModel> = new MatTableDataSource();
  filterDataSource!: Array<HeroeModel>

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private heroeService: HeroeService) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.heroeService.getAllHeroes$().subscribe(response => {
      console.log(response);
      this.dataSource.data = response;
    })
  }


  searchBy(event: Event, field: string) {
    //palabra por la que queremos filtrar que la recogemos del imput del html
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    //si quiere filtrar por superhero
    if (field == 'superhero') {
      //aplicamos un filtro a dataSource para en este caso filtrar solo por el campo superhero
      this.dataSource.filterPredicate = (data: HeroeModel, filter: string) => {
        return data.superhero.trim().toLowerCase().includes(filter);
      }

      //aplicamos el filtro a dataSource
      this.dataSource.filter = filterValue

      //si quiere filtrar por id
    } else if (field == 'id') {
      //aplicamos un filtro a dataSource para en este caso filtrar solo por el campo superhero
      this.dataSource.filterPredicate = (data: HeroeModel, filter: string) => {
        return data.id.trim().toLowerCase().includes(filter);
      }

      //aplicamos el filtro a dataSource
      this.dataSource.filter = filterValue


      //si no filtramos por todos los campos
    } else {
      this.dataSource.filter = filterValue
    }
  }

}
