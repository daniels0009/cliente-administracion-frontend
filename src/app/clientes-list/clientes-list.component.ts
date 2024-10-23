import { Component } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { Cliente } from '../cliente.model';

@Component({
  selector: 'app-clientes-list',
  templateUrl: './clientes-list.component.html',
  styleUrls: ['./clientes-list.component.css']
})
export class ClientesListComponent {
  clientes: Cliente[] = [];
  cliente: Cliente = new Cliente();
  mostrarFormulario: boolean = false;
  searchKey: string = '';
  mostrarBusquedaAvanzada: boolean = false;

  // Objeto para almacenar los valores de la búsqueda avanzada
  busquedaAvanzada: any = {
    sharedKey: '',
    nombre: '',
    telefono: '',
    email: '',
    fecha: ''
  };

  constructor(private clienteService: ClienteService) { 
    this.obtenerClientes();
  }

  obtenerClientes(): void {
    this.clienteService.listarClientes().subscribe(clientes => {
      this.clientes = clientes;
    });
  }

  buscarCliente(): void {
    if (this.searchKey.trim() !== '') {
      this.clienteService.buscarCliente(this.searchKey).subscribe(cliente => {
        this.clientes = cliente ? [cliente] : [];
      });
    } else {
      this.obtenerClientes(); // Recargar la lista si no se ha proporcionado una clave de búsqueda
    }
  }

  buscarAvanzado(): void {
    console.log('Búsqueda avanzada:', this.busquedaAvanzada);
    this.clienteService.buscarAvanzado(this.busquedaAvanzada).subscribe(clientes => {
      this.clientes = clientes;
    }, (error) => {
      console.log('Error en la búsqueda avanzada', error);
    });
  }

  abrirFormulario(): void {
    this.mostrarFormulario = true;
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
  }

  onSubmit(): void {
    this.clienteService.crearCliente(this.cliente).subscribe(
      (data: Cliente) => {
        console.log('Cliente creado con éxito', data);
        this.obtenerClientes(); // Recargar la lista de clientes
        this.cerrarFormulario(); // Cerrar el formulario
      },
      (error) => {
        console.log('Error al crear el cliente', error);
      }
    );
  }
}
