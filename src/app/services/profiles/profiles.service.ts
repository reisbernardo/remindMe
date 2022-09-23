import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {
  profiles = ["Jose", "Maria",  "Anésio"];
  constructor() { }
}
