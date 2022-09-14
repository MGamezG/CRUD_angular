import { HeroeModel } from './../../Models/heroe.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class HeroesServiceService {
  url='https://heroes-crud-1c450-default-rtdb.firebaseio.com'
  constructor(private http:HttpClient) { }
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
  upDateHero(hero:HeroeModel){
    const heroTemp={
      ...hero
    }
    delete heroTemp.id;
    return this.http.put(`${this.url}/heroes/${hero.id}.json`,heroTemp);
  }
}
