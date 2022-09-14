import { HeroeModel } from './../../Models/heroe.model';
import { HeroesServiceService } from './../../services/heroes/heroes-service.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

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

  deleteHero(id:string,i:number){
    let heroe!:HeroeModel
    Swal.fire({
      title:'¿estas seguro?',
      text:`estas seguro que desea borrar a ${heroe?.nombre}`,
      showConfirmButton:true,
      showCancelButton:true
    }).then(
      (response:any)=>{
        if(response.value){

          this.heroesList.splice(i,1)
          this.heroesService.deleteHero(id).subscribe();
        }
      }
    );

  }

}
