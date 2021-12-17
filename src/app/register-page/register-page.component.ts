import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  authService: AuthService
    router: Router

    nickname: string =""
    email: string = ""
    password: string = ""

    constructor(servicio: AuthService, ruteador: Router) {
        this.authService = servicio
        this.router = ruteador
    }

  ngOnInit(): void {
  }

  async onClickRegistrarse() {
    if (this.nickname !== "" && this.email !== "" && this.password !== "") {
        const response = await this.authService.register(this.nickname, this.email, this.password)
        if (response) {
            this.router.navigateByUrl("/publicaciones")
        } else {
            alert("Hubo un error al registrarse")
        }
    } else {
        alert("Los campos no deben estar vacíos.")
    }
}
}
