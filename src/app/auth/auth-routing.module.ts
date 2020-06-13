import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TriquiComponent } from './triqui/triqui.component';


const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'triqui', component: TriquiComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }