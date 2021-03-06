import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { AlertasService } from 'src/app/service/alertas.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {

  postagem: Postagem = new Postagem();
  idPost: number;

  tema: Tema = new Tema();
  listaTemas: Tema[]
  idTema: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private alertas: AlertasService
  ) { }

  ngOnInit(){

    window.scroll(0,0)

    this.idPost = this.route.snapshot.params['id']
    this.findByIdPostagem(this.idPost)


    this.postagemService.refreshToken()

  }

  findByIdPostagem(id: number){
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem)=>{
      this.postagem = resp;
    })
  }

  apagar(){

    this.postagemService.deletePostagem(this.idPost).subscribe(()=>{
      this.alertas.showAlertSuccess("Postagem deletada com sucesso!")

      this.router.navigate(['/inicio'])
    })
}

}
