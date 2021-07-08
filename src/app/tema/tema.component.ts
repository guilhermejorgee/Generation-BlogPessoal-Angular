import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  tema: Tema = new Tema()

  listaTemas: Tema[]

  constructor(
    private router: Router,
    private temaService: TemaService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(){

    this.temaService.refreshToken()

    this.findAllTemas();

    if(environment.token == ''){
      this.router.navigate(['/entrar'])
    }

    let id = this.route.snapshot.params['id']

    this.findTemaById(id)

  }

  findTemaById(id: number){

    this.temaService.getById(id).subscribe((resp: Tema)=>{
      this.tema = resp
    })

  }

  postTema(){
    this.temaService.postTema(this.tema).subscribe((resp: Tema)=>{
      this.tema = resp;

      alert('Tema cadastrado com sucesso')
      this.findAllTemas()
      this.tema = new Tema()

    })
  }

  findAllTemas(){

    this.temaService.getAllTema().subscribe((resp: Tema[])=>{

      this.listaTemas = resp;

    })
}

deleteTema(){

  this.temaService.deleteTema(this.tema.id).subscribe(()=>{
    alert('Tema deletado com sucesso')
    this.router.navigate(['/tema'])
  })

}



}
