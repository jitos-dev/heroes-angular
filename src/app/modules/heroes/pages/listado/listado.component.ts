import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { HeroeModel } from 'src/app/core/models/heroe.model';
import { HeroeService } from 'src/app/core/services/heroe.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.css']
})
export class ListadoComponent implements OnInit {

  displayedColumns: string[] = ['id', 'superhero', 'publisher', 'alter-ego', 'first-appearance'];
  dataSource: MatTableDataSource<HeroeModel> = new MatTableDataSource();

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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
