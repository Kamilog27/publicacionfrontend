import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PublicacionService } from '../publicacion.service';
import { Publicacion } from '../publicacion.model';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-publicaciones-page',
  templateUrl: './publicaciones-page.component.html',
  styleUrls: ['./publicaciones-page.component.css']
})
export class PublicacionesPageComponent implements OnInit {
  
  router: Router
  authService: AuthService
  publicacionService:PublicacionService
  publicaciones:Publicacion[]=[]
  nickname:string=""
  textoPublicacion:string=""
  constructor( ruteador: Router,publicacionS:PublicacionService,service: AuthService) {
    this.router = ruteador
    this.authService=service
    this.publicacionService=publicacionS
}

  ngOnInit(): void {
    this.queryPub()
  }

  async queryPub() {
    this.publicaciones= await this.publicacionService.queryPublicacion()
    this.nickname=this.authService.user.nickname
}

async crearPublicacion() {
  if (this.textoPublicacion!=="") {
      const response = await this.publicacionService.createPublicacion(this.textoPublicacion)
      if (response) {
        this.queryPub()
      } else {
          alert("Hubo un error al crear publicación")
      }
  } else {
      alert("Los campos no deben estar vacíos.")
  }
}
  cerrarSesion(){
    this.authService.logOut()
  }
}

  



