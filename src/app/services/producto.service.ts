import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProducto } from '../interfaces/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  productos?: IProducto[] = [];
  cargando: boolean = true;

  constructor(private http: HttpClient)
  {
    this.cargarProductos();
  }

  private cargarProductos()
  {
    this.http.get("https://tienda-puente-main-web-app-default-rtdb.firebaseio.com/producto_idx.json")
      .subscribe( (resp: any) => {
        this.productos = resp;
        this.cargando = false;
      });
  } 

}
