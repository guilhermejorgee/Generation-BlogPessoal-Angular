import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = new User()
  idUser: number;
  verificandoSenha: string;
  tipoUsuario: string;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(){

    this.idUser = this.route.snapshot.params['id']
    this.findByIdUser(this.idUser)

    window.scroll(0,0)

    if(environment.token == ''){
      alert('Sua sessão expirou, logue novamente')
      this.router.navigate(['/entrar'])
    }

  }

  confirmSenha(event: any){

    this.verificandoSenha = event.target.value


  }

  tipoUser(event: any){

    this.tipoUsuario = event.target.value;

  }

  findByIdUser(id: number){
    this.authService.getById(id).subscribe((resp: User)=>{
      this.user = resp;
    })
  }


  atualizar(){

    this.user.tipo = this.tipoUsuario;

    if(this.user.senha != this.verificandoSenha){
      alert('Senha incorreta')
    }else{

      this.authService.atualizar(this.user).subscribe((resp: User)=>{
        this.user = resp;

        console.log(this.user)

        alert('Usuario atualizado, faça o login novamente')

        environment.foto = ''
        environment.nome = ''
        environment.token = ''
        environment.id = -1;

        this.router.navigate(["/entrar"])

    

      })

  }

  }


}
