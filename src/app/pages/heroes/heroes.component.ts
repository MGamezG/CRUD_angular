import { HeroesServiceService } from './../../services/heroes/heroes-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  constructor( private heroesService:HeroesServiceService) { }

  ngOnInit(): void {
    this.getheroes()
  }
  heroesList:any[]=[]

  getheroes(){
    this.heroesService.getHeros().subscribe(
      (data:any)=>{
        this.heroesList=data
        console.log(this.heroesList,'lista')
      }
    )
  }

}
