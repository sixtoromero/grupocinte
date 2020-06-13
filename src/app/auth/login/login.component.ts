import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UsuariosModel } from '../../models/usuarios';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  iUsuario = new UsuariosModel();

  constructor(private outhService: AuthService,
              private router: Router) { }

  ngOnInit() {
  }

  async onLogin() {
    this.outhService.login(this.iUsuario).then(result => {
      if (result === null) {
        Swal.fire({
            icon: 'warning',
            title: 'Usuario o clave incorrecta',
            text: 'Por favor valide su usuario y contraseña sean correctas ',
            footer: '<a href>GRUPO CINTE</a>'
        });
      } else {
        this.router.navigateByUrl('/auth/triqui');
      }
    });
  }
}
