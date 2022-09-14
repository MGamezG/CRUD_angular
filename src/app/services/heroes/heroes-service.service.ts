import { HeroeModel } from './../../Models/heroe.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map,delay} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class HeroesServiceService {
  url='https://heroes-crud-1c450-default-rtdb.firebaseio.com'
  constructor(private http:HttpClient) { }
  /**
   * crear un nuevo registro
   * @param hero
   * @returns
   */
  createHero(hero:HeroeModel){
    return this.http.post(`${this.url}/heroes.json`,hero).pipe(
      map(
        (response:any)=>{
          hero.id=response.name
          return hero;
        }
      )
    );
  }
  /**
   * actualizar registro
   * @param hero
   * @returns
   */
  upDateHero(hero:HeroeModel){
    const heroTemp={
      ...hero
    }
    delete heroTemp.id;
    return this.http.put(`${this.url}/heroes/${hero.id}.json`,heroTemp);
  }

  /**
   * obtener la lista de heroes
   * @returns
   */
  getHeroes(){
    return this.http.get(`${this.url}/heroes.json`).pipe(
      map(
        (response:any)=>{
         return this.createArray(response)
        }
      ),
      delay(1500)
    );

  }
  /**
   * filtrado de heroes
   * convertir el objeto en un arreglo de objetos
   * @param heroesObjet
   * @returns
   */
  private createArray(heroesObjet:any) {
    const heroes:HeroeModel[]=[]
    //console.log(heroesObjet)
    if(heroesObjet===null){return[];}
    Object.keys(heroesObjet).forEach((key:any)=>{
      const hero:HeroeModel=heroesObjet[key];
      hero.id=key

      heroes.push(hero)
    })
    return heroes
  }
  /**
   * obtener solo un heroe para acceder al update
   */
  getHero(id:string){
    return this.http.get(`${this.url}/heroes/${id}.json`)
  }

  /**
   * borrar un registro
   * @param id
   * @returns
   */
  deleteHero(id:string){
    return this.http.delete(`${this.url}/heroes/${id}.json`)
  }
}
