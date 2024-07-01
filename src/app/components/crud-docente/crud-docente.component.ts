import { Component, OnInit } from '@angular/core';
import { Docente } from 'src/app/models/docente.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { DocenteService } from 'src/app/services/docente.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-docente',
  templateUrl: './crud-docente.component.html',
  styleUrls: ['./crud-docente.component.css'],
})
export class CrudDocenteComponent implements OnInit {
  //Para la Grilla
  docentes: Docente[] = [];
  filtro: string = '';

  //Para el ubigeo
  departamentos: string[] = [];
  provincias: string[] = [];
  distritos: Ubigeo[] = [];

  //Json para registrar o actualizar
  docente: Docente = {
    idDocente: 0,
    nombre: '',
    dni: '',
    estado: 1,
    ubigeo: {
      idUbigeo: 0,
      departamento: '-1',
      provincia: '-1',
      distrito: '-1',
    },
  };

  constructor(
    private docenteService: DocenteService,
    private ubigeoService: UbigeoService
  ) {
    this.ubigeoService
      .listarDepartamento()
      .subscribe((response) => (this.departamentos = response));
  }

  cargaProvincia() {
    this.ubigeoService
      .listaProvincias(this.docente.ubigeo?.departamento)
      .subscribe((response) => (this.provincias = response));
  }

  cargaDistrito() {
    this.ubigeoService
      .listaDistritos(
        this.docente.ubigeo?.departamento,
        this.docente.ubigeo?.provincia
      )
      .subscribe((response) => (this.distritos = response));
  }

  consulta() {
    this.docenteService
      .consultaDocente(this.filtro == '' ? 'todos' : this.filtro)
      .subscribe((x) => (this.docentes = x));
  }

  registra() {
    this.docenteService.registraDocente(this.docente).subscribe((x) => {
      alert(x.mensaje);
      this.consulta();
    });
  }

  busca(aux: Docente) {
    this.docente = aux;
    // dentro del metodo "busca" lo que va en cargaProvincia
    this.ubigeoService
      .listaProvincias(this.docente.ubigeo?.departamento)
      .subscribe((response) => (this.provincias = response));
    // dentro del metodo "busca" lo que va en cargaProvincia
    this.ubigeoService
      .listaDistritos(
        this.docente.ubigeo?.departamento,
        this.docente.ubigeo?.provincia
      )
      .subscribe((response) => (this.distritos = response));
  }

  cambioEstado(aux: Docente) {
    aux.estado = aux.estado == 1 ? 2 : 1; /* El profe puso asi 1 ? 0 : 1; */
    this.docenteService.actualizaDocente(aux).subscribe();
  }

  actualiza() {
    this.docenteService.actualizaDocente(this.docente).subscribe((x) => {
      alert(x.mensaje);
      this.consulta();
    });
  }

  ngOnInit(): void {}
}

/***
 * consulta()     Este metodo lo uso desde Html, en un boton.
 */
