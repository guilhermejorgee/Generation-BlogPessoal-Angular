
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
    ) { }

    token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }

  entrar(userLogin: UserLogin): Observable<UserLogin>{

    return this.http.post<UserLogin>('https://blogpessoalguijorge.herokuapp.com/usuarios/logar', userLogin)

  }

  cadastrar(user: User): Observable<User>{
    return this.http.post<User>('https://blogpessoalguijorge.herokuapp.com/usuarios/cadastrar', user)

  }

  atualizar(user: User): Observable<User>{
    return this.http.put<User>('https://blogpessoalguijorge.herokuapp.com/usuarios', user)

  }

  logado(){

    let ok = false;

    if(environment.token != ''){
      ok = true;
    }

    return ok;


  }

  getById(id: number): Observable<User>{
   return this.http.get<User>(`https://blogpessoalguijorge.herokuapp.com/usuarios/${id}`, this.token)
  }

  adm(){

    let ok = false;

    if(environment.tipo == 'adm'){
      ok = true;
    }

    return ok;


  }


}
