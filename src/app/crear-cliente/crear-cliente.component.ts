import { Component } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente.model';

@Component({
  selector: 'app-crear-cliente',
  templateUrl: './crear-cliente.component.html',
  styleUrls: ['./crear-cliente.component.css']
})
export class CrearClienteComponent {
  cliente: Cliente = new Cliente();
  mostrarFormulario: boolean = false;  // Control para mostrar el formulario modal

  constructor(private clienteService: ClienteService) { }

  // Muestra el formulario
  abrirFormulario(): void {
    this.mostrarFormulario = true;
  }

  // Cierra el formulario
  cerrarFormulario(): void {
    this.mostrarFormulario = false;
  }

  onSubmit(): void {
    this.clienteService.crearCliente(this.cliente).subscribe(
      (data: Cliente) => {
        console.log('Cliente creado con éxito', data);
        this.cerrarFormulario();  // Cierra el pop-up después de crear el cliente
      },
      (error) => {
        console.log('Error al crear el cliente', error);
      }
    );
  }
}
