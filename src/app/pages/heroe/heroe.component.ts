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
  constructor() { }

  ngOnInit(): void {
  }
  save(form:NgForm){
    if(form.invalid){
      console.log('no valido')
      return;
    }else{
      console.log(form)
      console.log(this.heroe)
    }

  }

}
