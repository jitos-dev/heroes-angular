import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataApiService } from 'src/app/core/services/data-api.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  registerGroup: FormGroup = new FormGroup({});

  user: any = {
    id: 1,
    usuario: '',
    email: '',
    password: '',
    token: ''
  }

  constructor(
    private fb: FormBuilder,
    private dataService: DataApiService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerGroup = this.fb.group({
      email: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100), Validators.email]],
      usuario: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      password2: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
    })
  }

  ngOnInit(): void {
  }

  registro() {

    //comprobamos que todo este correcto
    if (!this.registerGroup.valid) {
      return;
    }

    this.user = this.registerGroup.value

    if (this.user.password != this.user.password2) {
      this.openSnackBar('Las contraseñas introducidas no son iguales')
      return;
    }

    let idLastUser = 0

    this.dataService.getAllUsers$().subscribe({
      next: users => {

        //obtenemos el último id registrado en la bbdd
        idLastUser = Math.max(...users.map(user => user.id));

        //incrementamos el id
        this.user.id = idLastUser + 1

        //le asignamos el token antes de guardarlo
        this.user.token = this.generateToken()

        const userdb: any = {
          id: this.user.id,
          usuario: this.user.usuario,
          email: this.user.email,
          password: this.user.password,
          token: this.user.token
        }

        //guardamos el usuario
        this.dataService.addUser$(userdb).subscribe({
          next: user => {

            //mostramos un mensaje
            this.openSnackBar('Usuario guardado con exito')
            //si esta correcto nos vamos a home
            this.router.navigate(['/'])
          },
          error: error => {
            console.log('Error en registro.component in method registro data service. Error: ', error);
          }
        })
      },
      error: error => {
        console.log('Error en registro.component in method registro(). Error: ', error);
      }
    })
    console.log(this.user);
  }

  private generateToken(): string {
    const maxNumber = 999999999999; // El número máximo de 12 cifras
    const randomNumber = Math.round(Math.random() * maxNumber);
    return randomNumber.toString().padStart(12, '0');
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(
      message,
      "Aceptar",
      {
        duration: 3000
      }
    )
  }
}
