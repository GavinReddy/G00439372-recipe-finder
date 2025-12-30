
// Main Search Page

// This is the first page a user will see when opening the app.
// Users can search for recipes by entering ingredients.

// ANGULAR IMPORTS

import { Component } from '@angular/core';


import { CommonModule } from '@angular/common';
// Provides *ngIf and *ngFor directives

import { FormsModule } from '@angular/forms';
// Enables [(ngModel)]  for two-way data binding 

import { Router } from '@angular/router';
// Service for navigating between pages 

// Import Ionic components for the template
import {
  IonHeader,      // Fixed header bar at top of page
  IonToolbar,     // Container for title and buttons in header
  IonTitle,       // Displays the page title with student number
  IonContent,     // Scrollable main content area
  IonButton,      // Styled button 
  IonInput,       // Text input field for ingredients
  IonItem,        // Container for form elements
  IonLabel,       // Text label for input field
  IonList,        // Container for list of recipe cards
  IonCard,        // Card container for each recipe
  IonCardHeader,  // Header section of card
  IonCardTitle,   // Title text in card (recipe name)
  IonCardContent, // Body content of card (Details button)
  IonImg,         // Image component for recipe photos
  IonButtons,     // Container for icon buttons in toolbar
  IonIcon,        // Icon display (heart, settings)
  IonSpinner,     // Loading animation during API calls
} from '@ionic/angular/standalone';


// Import icons

import { addIcons } from 'ionicons';
// addIcons: Function to register icons for use in templates

import { heart, settings } from 'ionicons/icons';
// heart: Icon for favourites button
// settings: Icon for settings button


// SERVICE IMPORTS

import { RecipeService, Recipe } from '../services/recipe.service';
// RecipeService handles API calls to Spoonacular
// Recipe is an nterface defining recipe data structure 

// component decorator with  metadata

@Component({
  selector: 'app-home',              // HTML tag: <app-home></app-home>
  templateUrl: './home.page.html',   // Link to HTML template
  styleUrls: ['./home.page.scss'],   // Link to styles
  standalone: true,                   // No NgModule required
  imports: [                          // Dependencies for this component
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonImg,
    IonButtons,
    IonIcon,
    IonSpinner,
  ],
})
export class HomePage {
  
  // Properties for components

  ingredients: string = '';
  // Stores the text entered by user in the search input
  // Bound to input field with [(ngModel)]="ingredients"
  
  recipes: Recipe[] = [];
  // Array to store search results from Spoonacular API
  // Each recipe has an id, title, image
  
  isLoading: boolean = false;
  // Controls visibility of loading spinner
  // true then show spinner otherwise  false = hide spinner
  
  studentNumber: string = 'G00439372';
  // Displayed in the header toolbar as page title

 
  // Constructor for dependency injection
 
  constructor(
    private recipeService: RecipeService,  // Inject RecipeService for API calls
    private router: Router                  // Inject Router for navigation
  ) {
    // Register icons so they can be used in the template
    addIcons({ heart, settings });
  }

  // Search Methods for recipes

  // Called when a user clicks the Search button
  searchRecipes() {
    // Only search if a user enters something 
    if (this.ingredients.trim()) {
      
      // Show a loading spinner
      this.isLoading = true;
      
      // Call Spoonacular API via the RecipeService
      this.recipeService.searchRecipes(this.ingredients).subscribe({
        
        // SUCCESS if API returned data
        next: (response) => {
          this.recipes = response.results;  // Store recipes in array
          this.isLoading = false;           // Hide spinner
        },
        
        // ERROR if API call failed
        error: (error) => {
          console.error('Error fetching recipes:', error);  // Log error
          this.isLoading = false;                           // Hide spinner
        }
      });
    }
  }


  // Methods for viewing recipe details

  // Called when user clicks DETAILS button on a recipe card
  viewDetails(recipe: Recipe) {
    // Navigate to recipe-details page with recipe data as query parameters
    this.router.navigate(['/recipe-details'], {
      queryParams: {
        id: recipe.id,        // Recipe ID for API call
        title: recipe.title,  // Recipe name for display
        image: recipe.image   // Recipe image URL
      }
    });
   
  }

  // Methods for navigating to Favourites and Settings pages
  
  // Method called when the user clicks heart icon in the toolbar
  goToFavourites() {
    this.router.navigate(['/favourite']);
  }

  // Called when the user clicks settings icon in the toolbar
  goToSettings() {
    this.router.navigate(['/settings']);
  }
}
