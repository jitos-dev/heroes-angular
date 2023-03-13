import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataApiService } from 'src/app/core/services/data-api.service';
import { EmitterService } from 'src/app/shared/services/emitters.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginGroup: FormGroup = new FormGroup({})

  data: any = {
    user: '',
    password: ''
  }

  errorUserOrPassword: boolean = false

  constructor(
    private fb: FormBuilder,
    private emmiterService: EmitterService,
    private dataService: DataApiService,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.loginGroup = this.fb.group({
      user: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]]
    })
  }

  ngOnInit(): void {
  }

  login() {

    //comprobamos que todos los campos esten correctos
    if (!this.loginGroup.valid) {
      return;
    }

    this.data = this.loginGroup.value
    let userInDB = false
    let token: string

    this.dataService.getAllUsers$().subscribe({
      next: response => {

        response.forEach(user => {

          //si coincide el usuario y la contraseña
          if (user.usuario == this.data.user && user.password == this.data.password) {
            userInDB = true;
            token = user.token;
            return;
          }
        })

        //si no existe el usuario en la bbdd mostramos el error
        if (!userInDB) {
          this.errorUserOrPassword = true;
          return;
        }

        //si llega aquí es que todo está correcto y creamos la cookie
        this.cookieService.set('token', token)

        //cuando hace el login emitimos para que obtenga el cambio el resto de páginas que necesitemos
        this.emmiterService.loginEmitter.emit(true)

        //redireccionamos a home
        this.router.navigate(['/'])
      },
      error: error => {
        console.log('Error en login.compoenent in method login(). Error: ', error);
      }
    })


  }

}
