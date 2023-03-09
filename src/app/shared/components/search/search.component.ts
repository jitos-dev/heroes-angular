import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HeroeModel } from 'src/app/core/models/heroe.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  @Input()
  dataSource!: MatTableDataSource<HeroeModel>

  @Input()
  fieldSearch!: string

  constructor() { }

  ngOnInit(): void {
  }

  searchBy(event: Event) {
    //palabra por la que queremos filtrar que la recogemos del imput del html
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    console.log(filterValue, 'length: ', filterValue.length);

    //si quiere filtrar por superhero
    if (this.fieldSearch == 'superhero') {
      //aplicamos un filtro a dataSource para en este caso filtrar solo por el campo superhero
      this.dataSource.filterPredicate = (data: HeroeModel, filter: string) => {
        return data.superhero.trim().toLowerCase().includes(filter);
      }

      //aplicamos el filtro a dataSource
      this.dataSource.filter = filterValue

      //si quiere filtrar por id
    } else if (this.fieldSearch == 'id') {
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
