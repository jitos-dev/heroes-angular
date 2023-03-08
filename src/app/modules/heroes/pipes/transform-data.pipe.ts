import { Pipe, PipeTransform } from '@angular/core';
import { HeroeModel } from '../../../core/models/heroe.model';
import { MatTableDataSource } from '@angular/material/table';

@Pipe({
  name: 'transformData'
})
export class TransformDataPipe implements PipeTransform {

  transform(items: Array<any>): Array<HeroeModel> {

    /**Lo hago de esta forma porque lo que viene de bbdd el campo characters es un string con los nombres
     * de los personajes separados por una coma y HeroeModel el campo characters es un array de string y
     * por eso tenemos que mapearlo
     */
    const arrHeroes: Array<HeroeModel> = []

    items.forEach(item => {
      const heroe: HeroeModel = {
        id: item.id,
        superhero: item.superhero,
        publisher: item.publisher,
        alter_ego: item.alter_ego,
        first_appearance: item.first_appearance,
        characters: item.characters.split(",")
      }

      arrHeroes.push(heroe)
    })

    return arrHeroes;
  }

}
