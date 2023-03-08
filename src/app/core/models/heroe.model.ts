export interface HeroeModel {
  id: string,
  superhero: string,
  publisher: Publisher,
  alter_ego: string,
  first_appearance: string,
  characters: Array<string>
}

export enum Publisher {
  DCComics = 'DC Comics',
  MarvelComics = 'Marvel Comics',
  NotValue = 'Not Value'
}