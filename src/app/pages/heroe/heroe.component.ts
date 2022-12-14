import { HeroesServiceService } from './../../services/heroes/heroes-service.service';
import { HeroeModel } from './../../Models/heroe.model';
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms'
import Swal from 'sweetalert2';
import {Observable} from 'rxjs'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.scss']
})
export class HeroeComponent implements OnInit {
  heroe:HeroeModel=new HeroeModel();
  constructor(private heroeService:HeroesServiceService,
              private actvatedRouter:ActivatedRoute) { }

  ngOnInit(): void {
    const id:any=this.actvatedRouter.snapshot.paramMap.get('id');
    console.log(id)
    if(id!=='nuevo'){
      this.heroeService.getHero(id).subscribe(
        (response:any)=>{
          console.log(response)
          this.heroe=response
          this.heroe.id=id
        }
      )
    }
  }
  save(form:NgForm){
    if(form.invalid){
      console.log('no valido')
      return;
    }

    Swal.fire({
      title:'Epere..',
      text:'guardando informacion',
      allowOutsideClick:false
    });
    Swal.showLoading();

    let peticion:Observable<any>

    if(this.heroe.id){
      peticion=this.heroeService.upDateHero(this.heroe);
      // .subscribe(
      //   (response:any)=>{
      //     console.log(response)

      //   }
      // )
    }else{
      console.log(form)
      console.log(this.heroe)
      peticion=this.heroeService.createHero(this.heroe);
      // .subscribe(
      //   (response:any)=>{
      //     console.log(response)
      //     this.heroe=response
      //   }
      // )
    }
    peticion.subscribe(
      (response:any)=>{
        Swal.fire({
          title:this.heroe.nombre,
          text:'se actualizo correctamente',
          icon:'success'
        });
        console.log(response)
      }
    )

  }

}
