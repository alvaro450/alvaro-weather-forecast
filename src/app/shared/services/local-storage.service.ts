import { NgIf } from "@angular/common";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class LocalStorageService {
  constructor() {}

  get(key: string) {
    const stringifyItem = localStorage.getItem(key);
    if(stringifyItem !== null) {
      return JSON.parse(stringifyItem);
    } 
    return null;
  }

  set<T>(key: string, value: T) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Unable to store ${key} in localStorage`);
    }
  }
}
