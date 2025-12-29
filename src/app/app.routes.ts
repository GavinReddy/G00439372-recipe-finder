
import { Routes } from '@angular/router';

export const routes: Routes = [
  

  // Main search page where users enter ingredients
  {
    path: 'home',  // The URL segment after the domain
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    // loadComponent: Lazy loading - only loads HomePage when user visits /home
    // import(): Dynamic import that fetches the file on demand
    // .then((m) => m.HomePage): Extracts the HomePage class from the module
  },
  

  // Show ingredients, measurements, and cooking instructions
  {
    path: 'recipe-details',
    loadComponent: () => import('./recipe-details/recipe-details.page').then((m) => m.RecipeDetailsPage),
    // Parameters (id, title, image) are passed via router.navigate()

  },
  

  // Toggle between Metric and US measurements
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.page').then((m) => m.SettingsPage),
    // Settings are saved to Ionic Storage and persist after app closes
  },
  // Display list of saved favourite recipes
  {
    path: 'favourite',
    loadComponent: () => import('./favourites/favourites.page').then((m) => m.FavouritesPage),
    // Favourites are loaded from Ionic Storage
  },
  

  // Redirect users to home page when they open the app
  {
    path: '',           // Empty path = root URL
    redirectTo: 'home', // Automatically navigate to /home as the opening page
    pathMatch: 'full',  
    
  },
];


