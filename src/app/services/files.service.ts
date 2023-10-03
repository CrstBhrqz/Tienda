import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { saveAs } from "file-saver";
import { tap, map } from "rxjs/operators";// hacer procedimientos sin alterar la peticion Http
import { environment } from 'src/environments/environment';


interface File{
    originalname: string;
    filename: string;
    location:string;
}

@Injectable({
  providedIn: 'root'
})
export class FilesService {



  private apiUrl: string =`${environment.API_URL}/api/files`;


  constructor(
    private http: HttpClient
  ) { }

  getFile(name: string, url: string, type: string){
    return this.http.get(url,{responseType: 'blob'})// se obtiene el contenido
      .pipe(
        tap(content => {
          const blob = new Blob([content], {type});
          saveAs(blob, name);// guarda el archivo con el nombre indicado
        }),
        map(() =>  true // lo retorna si esta bien la peticion

        )
      )
  }

  UpLoadFile(file : Blob) {
    const dto = new FormData(); // objecto para enviar este tipo de campos
    dto.append('file',file);
    return this.http.post<File>(`${this.apiUrl}/upload`,dto,{
      // headers :{
      //   'Content-type': 'multipart/form--data' // por si el backend necesita algun tipo de cabecera
      // }
    })

  }
}
