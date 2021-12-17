import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './login-page/login-page.component';
import { PublicacionesPageComponent } from './publicaciones-page/publicaciones-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

const routes: Routes = [
  
  {
    path:"register",
    component:RegisterPageComponent
  },
  {
    path:"login",
    component:LoginPageComponent
  },
  {
    path:"publicaciones",
    component:PublicacionesPageComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
