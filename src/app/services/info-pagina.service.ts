import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InfoPagina } from "../interfaces/info-pagin.interface"
import { Equipo } from '../interfaces/equipo.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {
  info: InfoPagina = {};
  cargada: boolean = false;
  equipo!: any[];
  constructor(private http: HttpClient) {
    this.cargaInfo();
    this.cargarEquipo();
  }

  private cargaInfo()
  {
    this.http.get('assets/data/data-pagina.json')
      .subscribe( (resp: InfoPagina) => {
        this.cargada = true;
        this.info = resp;
      });
  }

  private cargarEquipo(){
    this.http.get('https://tienda-puente-main-web-app-default-rtdb.firebaseio.com/equipo.json')
      .subscribe( (resp: any) => {
        this.equipo = resp;
      });
  }

}
