import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GestionUsuariosComponent } from './gestion-usuarios/gestion-usuarios.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'gestion-usuarios', component: GestionUsuariosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
