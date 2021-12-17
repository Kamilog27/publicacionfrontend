import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Publicacion } from './publicacion.model';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  httpClient: HttpClient
  authService: AuthService


  publicacion: Publicacion = {
    text: "",
    nickname:""
  }

  constructor(client: HttpClient, service: AuthService) {
    this.httpClient = client
    this.authService = service

  }

  async queryPublicacion(): Promise<Publicacion[]> {

    this.authService.checkLoginUser()
    let allPublicacion: Publicacion[] = []

    try {
      const data = await this.httpClient.get("http://localhost:3000/publicaciones", {
        headers: {
          email: this.authService.user.email,
          nickname: this.authService.user.nickname,
          accesstoken: this.authService.user.token ?? ""
        }
      }).toPromise()
      const parsedData = JSON.parse(JSON.stringify(data))
      allPublicacion = parsedData.data.publicacion

    } catch (error) {
      console.log(error)
    }
    const currentsPub: Publicacion[] = []
    for (let i = 0; i < allPublicacion.length; i++) {

      currentsPub.push(new Publicacion(allPublicacion[i].text,allPublicacion[i].nickname, allPublicacion[i].createdAt, allPublicacion[i].updatedAt))

    }
    return currentsPub;
  }

  async createPublicacion(text: string): Promise<boolean> {
    this.authService.checkLoginUser()
    try {
      const data = await this.httpClient.post("http://localhost:3000/create-publicacion", {text},{
        headers: {
          email: this.authService.user.email,
          nickname: this.authService.user.nickname,
          accesstoken: this.authService.user.token ?? ""
        }
      }).toPromise()
      console.log(data)
      const parsedData = JSON.parse(JSON.stringify(data))
      if (parsedData.status === true) {
        this.publicacion.text = parsedData.data.text
        return true
      }
      alert("Error no se pudo crear la publicacion. " + parsedData.data.error)
      return false
    } catch (error) {
      console.log(error)
      return false
    }
  }
}
