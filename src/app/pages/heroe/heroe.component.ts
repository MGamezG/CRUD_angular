import { HeroesServiceService } from './../../services/heroes/heroes-service.service';
import { HeroeModel } from './../../Models/heroe.model';
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms'

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.scss']
})
export class HeroeComponent implements OnInit {
  heroe:HeroeModel=new HeroeModel();
  constructor(private heroeService:HeroesServiceService) { }

  ngOnInit(): void {
  }
  save(form:NgForm){
    if(form.invalid){
      console.log('no valido')
      return;
    }

    if(this.heroe.id){
      this.heroeService.upDateHero(this.heroe).subscribe(
        (response:any)=>{
          console.log(response)

        }
      )
    }else{
      console.log(form)
      console.log(this.heroe)
      this.heroeService.createHero(this.heroe).subscribe(
        (response:any)=>{
          console.log(response)
          this.heroe=response
        }
      )
    }

  }

}
