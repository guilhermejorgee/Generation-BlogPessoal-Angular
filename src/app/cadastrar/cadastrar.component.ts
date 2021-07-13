import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  user: User = new User();

  verificadoSenha: string;

  tipoUsuario: string;
 
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit(){
    window.scroll(0,0)
  }

  confirmSenha(event: any){

    this.verificadoSenha = event.target.value

  }

  tipoUser(event: any){

    this.tipoUsuario = event.target.value;

  }

  cadastrar(){

    this.user.tipo = this.tipoUsuario;

    if(this.user.senha != this.verificadoSenha){
      this.alertas.showAlertDanger('Senha incorreta')
    }else{

      this.authService.cadastrar(this.user).subscribe((resp: User)=>{
        this.user = resp;

        console.log(this.user)

        this.router.navigate(["/entrar"])

        this.alertas.showAlertSuccess('Usuario cadastrado')

      })

  }


  }

}
