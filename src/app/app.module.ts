import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ClientesListComponent } from './clientes-list/clientes-list.component';
import { CrearClienteComponent } from './crear-cliente/crear-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    ClientesListComponent,
    CrearClienteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
