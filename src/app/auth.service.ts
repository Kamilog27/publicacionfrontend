import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Router } from '@angular/router';
import { User } from './user.model';
import { Publicacion } from './publicacion.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  router: Router
  user: User = {
    email: "",
    nickname: "",
    token: "",
  }
  publicaciones!: Publicacion[]

  clienteHttp: HttpClient
  constructor(cliente: HttpClient, ruteador: Router) {
    this.clienteHttp = cliente
    this.router = ruteador
  }

  async register(nickname: string, email: string, password: string): Promise<boolean> {
    try {
      const data = await this.clienteHttp.post("http://localhost:3000/user/register", { email, nickname, password }).toPromise()
      const parsedData = JSON.parse(JSON.stringify(data))
      if (parsedData.status === true) {
        this.user.email = parsedData.data.email
        this.user.nickname = parsedData.data.nickname
        this.user.token = parsedData.data.token
        localStorage.setItem("email", this.user.email)
        localStorage.setItem("nickname", this.user.nickname)
        localStorage.setItem("token", this.user.token ?? "")
        return true
      }
      alert("Error no se pudo realizar el registro. " + parsedData.data.error)
      return false
    } catch (error) {
      console.log(error)
      return false
    }
  }
  checkLoginUser(): boolean {
    const localEmail = localStorage.getItem("email")
    const localNickname = localStorage.getItem("nickname")
    const localToken = localStorage.getItem("token")
    if (localEmail && localNickname && localToken) {
      this.user.email = localEmail
      this.user.nickname = localNickname
      this.user.token = localToken
      return true
    }
    return false
  }
  async logIn(email: string, password: string): Promise<boolean> {
    try {
      const data = await this.clienteHttp.post("http://localhost:3000/user/login", { email, password }).toPromise()
      const parsedData = JSON.parse(JSON.stringify(data))
      if (parsedData.status === true) {
        this.user.email = parsedData.data.email
        this.user.nickname = parsedData.data.nickname
        this.user.token = parsedData.data.token
        localStorage.setItem("email", this.user.email)
        localStorage.setItem("nickname", this.user.nickname)
        localStorage.setItem("token", this.user.token ?? "")
        return true
      }
      alert("Error no se pudo realizar el inicio de sesión. " + parsedData.data.error)
      return false
    } catch (error) {
      console.log(error)
      return false
    }
  }
  logOut(): void {
    localStorage.clear()
    this.user.email = ""
    this.user.nickname = ""
    this.user.token = ""
    this.router.navigateByUrl("/login")
  }

}


