import { Injectable } from '@angular/core'; 
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
@Injectable() 
export class ApiHttpService { 
constructor( 
// Angular Modules 
private http: HttpClient 
) { } 

// headers:any = new HttpHeaders()
//       .set('Authorization', 'Bearer <access_token>')
//       .set('Content-Type', 'application/json')
 get(params:any) { 
return this.http.post('https://nameapi-y5iq.onrender.com/api/dashboard/getdata',params,{headers:new HttpHeaders({
    'Content-Type':'application/json',
    'Accept':"*/*",
    'Access-Control-Allow-Orgin':"*"
})}); 
} 
 insert(options?: any) { 
return this.http.post('https://nameapi-y5iq.onrender.com/api/dashboard/insertdata', options); 
} 
// public put(url: string, data: any, options?: any) { 
// return this.http.put(url, data, options); 
// } 
 delete(params:any) { 
return this.http.post('https://nameapi-y5iq.onrender.com/api/dashboard/delete',params); 
} 
}