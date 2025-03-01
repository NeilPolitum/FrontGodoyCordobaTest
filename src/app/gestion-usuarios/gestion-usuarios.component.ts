import { Component } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent {
  mostrarFormularioCrear: boolean = false;
  mostrarListaUsuarios: boolean = false;
  successMessage: string | null = null;
  usuarios: any[] = [];
  usuarioSeleccionado: any = null;
  nuevoUsuario: any = {
    nombre: '',
    apellidos: '',
    cedula: '',
    correoElectronico: '',
    password: '',
    fechaUltimoAcceso: new Date().toISOString()
  };
  
  constructor(private userService: UserService) {}

  mostrarFormulario() {
    this.mostrarFormularioCrear = true;
    this.mostrarListaUsuarios = false;
    this.successMessage = null;
    this.usuarioSeleccionado = null;
  }

  crearUsuario() {
    this.userService.crearUsuario(this.nuevoUsuario).subscribe(
      response => {
        console.log('Usuario creado:', response);
        this.successMessage = 'Usuario creado correctamente';
        this.mostrarFormularioCrear = false;
        this.nuevoUsuario = { Nombre: '', Apellidos: '', Cedula: '', CorreoElectronico: '', Password: '', FechaUltimoAcceso: new Date().toISOString() };
      },
      error => {
        console.error('Error al crear usuario:', error);
        this.successMessage = null;
      }
    );
  }

  listarUsuarios(borrarMensaje: boolean = true) {
    this.userService.listarUsuarios().subscribe(
      response => {
        this.usuarios = Array.isArray(response) ? response : response.data || [];
        this.mostrarListaUsuarios = true;
        this.mostrarFormularioCrear = false;
        if (borrarMensaje) {
          this.successMessage = null;
        }
        this.usuarioSeleccionado = null;
      },
      error => console.error('Error al listar usuarios:', error)
    );
  }

  seleccionarUsuario(usuario: any) {
    this.usuarioSeleccionado = usuario;
    this.nuevoUsuario = { ...usuario };
  }

  editarUsuario() {
    if (this.usuarioSeleccionado) {
      this.userService.editarUsuario(this.usuarioSeleccionado.id, this.nuevoUsuario).subscribe(
        response => {
          console.log('Usuario editado:', response);
          this.successMessage = 'Usuario editado correctamente';
          this.usuarioSeleccionado = null;
          this.nuevoUsuario = { Nombre: '', Apellidos: '', Cedula: '', CorreoElectronico: '', Password: '', FechaUltimoAcceso: new Date().toISOString() };
          this.listarUsuarios(true);
        },
        error => {
          console.error('Error al editar usuario:', error);
          this.successMessage = null;
        }
      );
    }
  }

  eliminarUsuario(id: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      this.userService.eliminarUsuario(id).subscribe(
        response => {
          console.log('Usuario eliminado:', response);
          this.successMessage = 'Usuario eliminado correctamente';
          this.listarUsuarios(false);
          this.usuarioSeleccionado = null;
        },
        error => console.error('Error al eliminar usuario:', error)
      );
    }
  }

  todosLosCamposLlenos(): boolean {
    return this.nuevoUsuario.nombre && this.nuevoUsuario.apellidos && this.nuevoUsuario.cedula &&
            this.nuevoUsuario.correoElectronico && this.nuevoUsuario.password;
  }
}
