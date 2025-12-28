import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Recipe } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  // Settings methods
  async setMeasurementUnit(unit: string): Promise<void> {
    await this._storage?.set('measurementUnit', unit);
  }

  async getMeasurementUnit(): Promise<string> {
    const unit = await this._storage?.get('measurementUnit');
    return unit || 'metric';
  }

  // Favourites methods
  async getFavourites(): Promise<Recipe[]> {
    const favourites = await this._storage?.get('favourites');
    return favourites || [];
  }

  async addFavourite(recipe: Recipe): Promise<void> {
    const favourites = await this.getFavourites();
    const exists = favourites.find(f => f.id === recipe.id);
    if (!exists) {
      favourites.push(recipe);
      await this._storage?.set('favourites', favourites);
    }
  }

  async removeFavourite(recipeId: number): Promise<void> {
    let favourites = await this.getFavourites();
    favourites = favourites.filter(f => f.id !== recipeId);
    await this._storage?.set('favourites', favourites);
  }

  async isFavourite(recipeId: number): Promise<boolean> {
    const favourites = await this.getFavourites();
    return favourites.some(f => f.id === recipeId);
  }
}