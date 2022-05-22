import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

//https://app.quicktype.io/  Para crear las interfaces
  private apiKey: string = '4y211eiS4j1zDE85zYFu2ITg6SYOX7ps';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  //TODO: Cambiar any por su tipo respectivo.
  public resultados: Gif[] = []

  get historial(): string[] {
    return [...this._historial];
  }

  constructor( private http: HttpClient) {

    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    //Segunda forma de hacerlo
    // if( localStorage.getItem('historial') ){
    //   this._historial = JSON.parse(localStorage.getItem('historial')! );
    // }
    //Cargar último resultado de Imágenes
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs( query: string ){

    query = query.trim().toLowerCase();
    
    if( !this._historial.includes( query ) ){
      
      
      this._historial.unshift( query );
      
      this._historial = this._historial.splice(0,10);
      
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
      
      const params = new HttpParams()
            .set('api_key', this.apiKey )
            .set('limit', '10' )
            .set('q', query );

      //Como se hace con observables
      // this.http.get<SearchGifsResponse>(`/search?api_key=4y211eiS4j1zDE85zYFu2ITg6SYOX7ps&q=${ query }&limit=10`)
      this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, { params })
      .subscribe( ( resp ) => {
        this.resultados = resp.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
        
      } )


    //Como llamar un API desde JS
    // fetch('api.giphy.com/v1/gifs/search?api_key=4y211eiS4j1zDE85zYFu2ITg6SYOX7ps&q=dragon ball z&limit=10').then(resp => {
    //   resp.json().then(data => {
    //     console.log(data);
    //   })
    // })

    //Con el método async y utilizando un await
    // const resp = await fetch('api.giphy.com/v1/gifs/search?api_key=4y211eiS4j1zDE85zYFu2ITg6SYOX7ps&q=dragon ball z&limit=10');
    // const data = await resp.json();
    // console.log(data)

  }


}
