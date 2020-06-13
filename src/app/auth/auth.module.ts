import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { TriquiComponent, SafePipe } from './triqui/triqui.component';

@NgModule({
  declarations: [LoginComponent, TriquiComponent, SafePipe],
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    HttpClientModule
  ],
  providers:[AuthService]
})
export class AuthModule {}
