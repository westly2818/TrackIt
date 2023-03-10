import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
@Injectable() 
export class ApiHttpService { 
constructor( 
// Angular Modules 
private http: HttpClient 
) { } 
public get(params:any) { 
return this.http.post('https://nameapi-y5iq.onrender.com/api/dashboard/getdata',params); 
} 
async insert(options?: any) { 
return this.http.post('https://nameapi-y5iq.onrender.com/api/dashboard/insertdata', options); 
} 
// public put(url: string, data: any, options?: any) { 
// return this.http.put(url, data, options); 
// } 
public delete(params:any) { 
return this.http.post('https://nameapi-y5iq.onrender.com/api/dashboard/delete',params); 
} 
}