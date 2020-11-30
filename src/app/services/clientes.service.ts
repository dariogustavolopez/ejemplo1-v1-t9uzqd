import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { of } from "rxjs";
import { Cliente } from "../models/cliente";
@Injectable({
  providedIn: "root"
})
export class ClientesService {
resourceUrl: string;
  constructor(private httpClient: HttpClient) {
    // la barra al final del resourse url es importante para los metodos que concatenan el id del recurso (GetById, Put)
   
    this.resourceUrl = "https://pav2.azurewebsites.net/api/clientes/";

  }

  get(Nombre: string, Activo: boolean, Pagina: number) {
    let params = new HttpParams();
    if (Nombre != null) {
      params = params.append("Nombre", Nombre);
    }
    if (Activo != null) {   // para evitar error de null.ToString()
      params = params.append("Activo", Activo.toString());
    }
    params = params.append("Pagina", Pagina.toString());

    return this.httpClient.get(this.resourceUrl, { params: params });
  }

  getById(Id: number) {
    return this.httpClient.get(this.resourceUrl + Id);
  }

  post(obj:Cliente) {
    return this.httpClient.post(this.resourceUrl, obj);
  }

  put(Id: number, obj:Cliente) {
    return this.httpClient.put(this.resourceUrl + Id, obj);
  }

  delete(Id) {
    return this.httpClient.delete(this.resourceUrl + Id);
  }
}