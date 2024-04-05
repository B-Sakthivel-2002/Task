import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map } from 'rxjs';
import { equipment, transport } from './interface';

@Injectable({
  providedIn: 'root'
})
export class DepoService {

  constructor(private http: HttpClient) { }
  addEquipment(a:equipment):Observable<equipment[]>
  {
    return this.http.post<equipment[]>('http://localhost:5267/api/depo/equipment',a);
  }
  addTransport(a:transport):Observable<transport[]>
  {
    console.log("ser:"+a);
    return this.http.post<transport[]>('http://localhost:5267/api/depo/transport',a);
  }
 
  getMergedDetails(): Observable<any[]> {
    return forkJoin([
      this.http.get<any[]>('http://localhost:5267/api/depo/equipment'),
      this.http.get<any[]>('http://localhost:5267/api/depo/transport')
    ]).pipe(
      map(([equipmentData, transportData]) => {
        // Merge the data from both APIs into a single dataset
        const mergedData = [];
        for (const equipment of equipmentData) {
          const correspondingTransport = transportData.find(t => t.transportId === equipment.equipmentId);
          if (correspondingTransport) {
            const mergedItem = { ...equipment, ...correspondingTransport };
            mergedData.push(mergedItem);
          }
        }
        return mergedData;
      })
    );
  }

  loadbusinesspartner(){
    return this.http.get('http://localhost:5267/api/depo/business');
  }
  loadDepot(){
    return this.http.get('http://localhost:5267/api/depo/depot');
  }
}
