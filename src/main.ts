
// main.ts - Application Entry Point
// This file bootstraps (starts) the Angular/Ionic application.
import { enableProdMode, importProvidersFrom } from '@angular/core';
// enableProdMode: Disables Angular development checks for production builds

import { bootstrapApplication } from '@angular/platform-browser';
// bootstrapApplication: Starts the Angular app with the standalone component

import { RouteReuseStrategy, provideRouter } from '@angular/router';
// RouteReuseStrategy: Controls how Angular reuses route components
// provideRouter: Configures the Angular router with our route definitions


// IONIC IMPORTS

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
// IonicModule: Contains all Ionic UI components (ion-button, ion-card, etc.)
// IonicRouteStrategy: Ionic's navigation strategy that enables page transition animations

import { provideHttpClient } from '@angular/common/http';
// provideHttpClient: Enables HttpClient service for making API calls to Spoonacular

import { IonicStorageModule } from '@ionic/storage-angular';
// IonicStorageModule: Enables persistent storage for saving favourites and settings


import { routes } from './app/app.routes';
// home -> HomePage
// recipe-details -> RecipeDetailsPage
// settings -> SettingsPage
// favourite -> FavouritesPage

import { AppComponent } from './app/app.component';


bootstrapApplication(AppComponent, {

  providers: [
    
    // Use Ionic's route strategy instead of Angular's default for smooth transitions
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    

    importProvidersFrom(IonicModule.forRoot({})),
    
    // Start Ionic Storage for data persistence
    // Used by StorageService to save favourites and settings

    importProvidersFrom(IonicStorageModule.forRoot()),
    
    // Start HttpClient for API calls
    // Used by RecipeService to call Spoonacular API:
    //   - searchRecipes()
    //   - getRecipeDetails()
    provideHttpClient(),
    
    // Enables navigation between Home, Recipe Details, Settings, and Favourites
    provideRouter(routes),
  ],
});
