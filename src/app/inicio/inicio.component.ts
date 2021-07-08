import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  listaTemas: Tema[];

  idTema: number;

  tema: Tema = new Tema();

  postagem: Postagem = new Postagem();

  user: User = new User();

  userPostagens: User = new User();

  userId = environment.id;

  listaDePostagens: Postagem[];

  


  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private auth: AuthService
  ) { }


  ngOnInit(){

    this.postagemService.refreshToken()

    if(environment.token == ''){
      alert('Sua sessão expirou, logue novamente')
      this.router.navigate(['/entrar'])
    }

    this.findAllTemas()

    this.findAllPostagens()

  }

  findAllTemas(){

    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listaTemas = resp;
    
    })
  }

  findByIdTema(){
      this.temaService.getById(this.idTema).subscribe((resp: Tema)=>{
        this.tema = resp;
      })
  }

  publicar(){

    this.tema.id = this.idTema

    this.postagem.tema = this.tema

    this.user.id = this.userId;

    this.postagem.usuario = this.user

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem)=>{
      this.postagem = resp;

    this.postagem = new Postagem();  

    this.findAllPostagens

      alert('Postagem realizada com sucesso')
    })

  }

  findAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[])=>{
      this.listaDePostagens = resp;
    })
  }

  findPostagensByUser(){
    this.auth.getById(this.userId).subscribe((resp: User)=>{
      this.userPostagens = resp;
    })
  }



}
