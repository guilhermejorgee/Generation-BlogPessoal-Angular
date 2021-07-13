import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tema } from 'src/app/model/Tema';
import { AlertasService } from 'src/app/service/alertas.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-tema-delete',
  templateUrl: './tema-delete.component.html',
  styleUrls: ['./tema-delete.component.css']
})
export class TemaDeleteComponent implements OnInit {

  tema: Tema = new Tema()

  //idTema: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private temaService: TemaService,
    private alertas: AlertasService
  ) { }

  ngOnInit(){

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

  deleteTema(){

    this.temaService.deleteTema(this.tema.id).subscribe(()=>{
      this.alertas.showAlertSuccess('Tema deletado com sucesso')
      this.router.navigate(['/tema'])
    })

  }

}
