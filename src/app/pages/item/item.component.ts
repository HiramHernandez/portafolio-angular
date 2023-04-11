import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { IProductoDescripcion } from 'src/app/interfaces/produc-description.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  producto: IProductoDescripcion = {};
  id: string = "";

  constructor(private route: ActivatedRoute,
            public productpService: ProductoService) {
  }

  ngOnInit(): void {
    this.route.params
      .subscribe( parametros => {
        this.productpService.getProducto(parametros['id'])
          .subscribe(product => {
            this.id = parametros['id'];
            console.log(product);
            this.producto = product;
          });

      })
  }
}
