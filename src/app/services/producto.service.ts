import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProducto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  productos?: IProducto[] = [];
  cargando: boolean = true;
  productosFiltrado?: IProducto[] = [];

  constructor(private http: HttpClient)
  {
    this.cargarProductos();
  }

  private cargarProductos()
  {

    return new Promise<void>( (resolve, reject) => {
      this.http.get("https://tienda-puente-main-web-app-default-rtdb.firebaseio.com/producto_idx.json")
      .subscribe( (resp: any) => {
        this.productos = resp;
        this.cargando = false;
        resolve();
      });
    });
    
  }

  getProducto(id: string){
    let url: string = `https://tienda-puente-main-web-app-default-rtdb.firebaseio.com/producto/${id}.json`;
    return this.http.get(url);
  }

  buscarProducto(termino: string){
    if (this.productos?.length === 0)
    {
      //carga productos
      this.cargarProductos().then(() => {
        //ejecutar después de tener los productos
        //apliar filtro
        this.filtrarProductos(termino);
      })
    }
    else{

    }
    this.productosFiltrado = this.productos?.filter(producto => {
      return true;
    });
  }

  private filtrarProductos(termino: string){
 
    this.productosFiltrado = [];
    termino = termino.toLowerCase();

    this.productos?.forEach( producto => {
      if(producto.categoria || producto.titulo){
        const tituloLowerCase = producto.titulo?.toLocaleLowerCase();
        if (
            (producto.categoria && producto.categoria?.indexOf( termino ) >= 0) || 
            (tituloLowerCase && tituloLowerCase.indexOf( termino ) >= 0))
        {
          this.productosFiltrado?.push(producto)
        }
      }
        
      
    });

  }

}
