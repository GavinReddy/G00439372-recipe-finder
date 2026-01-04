/*
  Storage Service
  
  This service handles all data persistence using Ionic Storage.
  It manages:
  - User settings (measurement unit preference)
  - Favourite recipes list
  
  Ionic Storage provides a simple key-value storage system that
  works across all platforms (browser, iOS, Android) and persists
  data even after the app is closed.
*/

import { Injectable } from '@angular/core';
// Injectable: Decorator that marks this class as available for dependency injection

import { Storage } from '@ionic/storage-angular';
// Storage: Ionic Storage module for persistent data storage

import { Recipe } from './recipe.service';
// Recipe: Interface defining recipe data structure

@Injectable({
  providedIn: 'root'  // Service is available application-wide
})
export class StorageService {
  
  // Private reference to the initialized storage instance
  // null until init() completes
  private _storage: Storage | null = null;

  // Inject the Ionic Storage service
  constructor(private storage: Storage) {
    // Initialize storage when service is created
    this.init();
  }

  /*
    init - Initialize the Ionic Storage system
    
    Must be called before any storage operations.
    Creates the underlying storage database.
  */
  async init() {
    // Create the storage instance
    const storage = await this.storage.create();
    // Store reference for later use
    this._storage = storage;
  }

  // ============================================
  // SETTINGS METHODS
  // Handle user preferences for measurement units
  // ============================================

  /*
    setMeasurementUnit - Save the user's measurement preference
    
    @param unit - Either 'metric' or 'us'
    
    Called from Settings page when user changes selection.
    Value persists after app is closed.
  */
  async setMeasurementUnit(unit: string): Promise<void> {
    await this._storage?.set('measurementUnit', unit);
  }

  /*
    getMeasurementUnit - Retrieve the user's measurement preference
    
    @returns Promise<string> - Either 'metric' or 'us'
    
    Returns 'metric' as default if no preference has been saved.
    Called from Recipe Details page to display correct units.
  */
  async getMeasurementUnit(): Promise<string> {
    const unit = await this._storage?.get('measurementUnit');
    // Return saved value or default to 'metric'
    return unit || 'metric';
  }

  // ============================================
  // FAVOURITES METHODS
  // Handle saving and retrieving favourite recipes
  // ============================================

  /*
    getFavourites - Retrieve all saved favourite recipes
    
    @returns Promise<Recipe[]> - Array of favourite recipes
    
    Returns empty array if no favourites have been saved.
    Called from Favourites page to display the list.
  */
  async getFavourites(): Promise<Recipe[]> {
    const favourites = await this._storage?.get('favourites');
    // Return saved array or empty array
    return favourites || [];
  }

  /*
    addFavourite - Add a recipe to favourites
    
    @param recipe - Recipe object to save (id, title, image)
    
    Checks for duplicates before adding.
    Called from Recipe Details page when user clicks "Add to Favourites".
  */
  async addFavourite(recipe: Recipe): Promise<void> {
    // Get current favourites
    const favourites = await this.getFavourites();
    
    // Check if recipe already exists (prevent duplicates)
    const exists = favourites.find(f => f.id === recipe.id);
    
    if (!exists) {
      // Add new recipe to array
      favourites.push(recipe);
      // Save updated array
      await this._storage?.set('favourites', favourites);
    }
  }

  /*
    removeFavourite - Remove a recipe from favourites
    
    @param recipeId - ID of recipe to remove
    
    Called from Recipe Details page when user clicks "Remove from Favourites".
  */
  async removeFavourite(recipeId: number): Promise<void> {
    // Get current favourites
    let favourites = await this.getFavourites();
    
    // Filter out the recipe with matching ID
    favourites = favourites.filter(f => f.id !== recipeId);
    
    // Save updated array
    await this._storage?.set('favourites', favourites);
  }

  /*
    isFavourite - Check if a recipe is in favourites
    
    @param recipeId - ID of recipe to check
    @returns Promise<boolean> - true if recipe is a favourite
    
    Called from Recipe Details page to determine button text.
  */
  async isFavourite(recipeId: number): Promise<boolean> {
    const favourites = await this.getFavourites();
    // Returns true if any favourite has matching ID
    return favourites.some(f => f.id === recipeId);
  }
}