import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {


  private apiKey: string = '4y211eiS4j1zDE85zYFu2ITg6SYOX7ps'

  private _historial: string[] = [];

  //TODO: Cambiar any por su tipo respectivo.
  public resultados: any[] = []

  get historial(): string[] {
    return [...this._historial];
  }

  constructor( private http: HttpClient) {

  }

  buscarGifs( query: string ){

    query = query.trim().toLowerCase();
    
    if( this._historial.includes( query ) ){
      return
    }
    
    this._historial.unshift( query );
    
    this._historial = this._historial.splice(0,10);

    //Como se hace con observables
    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=4y211eiS4j1zDE85zYFu2ITg6SYOX7ps&q=${ query }&limit=10`)
          .subscribe( ( resp: any ) => {
            console.log( resp.data );
            this.resultados = resp.data;
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
