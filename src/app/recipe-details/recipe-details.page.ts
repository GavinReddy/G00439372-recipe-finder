
// Recipe Details Page
// This page displays full recipe information including:
// - Ingredients with images and measurements
// - Cooking instructions
// - Add/Remove from favourites button

// Angular Imports

import { Component, OnInit } from '@angular/core';
// Component: Decorator to define an Angular component
// OnInit: Lifecycle interface for initialization logic

import { CommonModule } from '@angular/common';
// CommonModule: Provides *ngIf and *ngFor directives

import { ActivatedRoute } from '@angular/router';
// ActivatedRoute: Service to access query parameters passed from Home page

// Ionic UI Imports

import {
  IonHeader,       // Fixed header at top
  IonToolbar,      // Container for title and back button
  IonTitle,        // Page title
  IonContent,      // Scrollable content area
  IonCard,         // Card container for ingredients/instructions
  IonCardHeader,   // Card header section
  IonCardTitle,    // Title within card 
  IonCardContent,  // Card body content
  IonImg,          // Image display for ingredient photos
  IonButton,       // Add to Favourites button
  IonBackButton,   // Back arrow to return to Home page
  IonButtons,      // Container for buttons in toolbar
  IonIcon,         // Heart icon for favourites
  IonSpinner,      // Loading animation
  IonList,         // List container for ingredients
  IonItem,         // Individual list item
  IonLabel,        // Text label for list items
} from '@ionic/angular/standalone';

// Ionicons Imports

import { addIcons } from 'ionicons';
// addIcons: Registers icons for use in template

import { heart, heartOutline } from 'ionicons/icons';
// heart: Filled heart icon (when recipe IS a favourite)
// heartOutline: Empty heart icon (when recipe is NOT a favourite)

// Service Imports

import { RecipeService, RecipeDetails, Recipe } from '../services/recipe.service';
// RecipeService: Handles API calls to Spoonacular
// RecipeDetails: Interface for full recipe data (ingredients, instructions)
// Recipe: Interface for basic recipe data (id, title, image)

import { StorageService } from '../services/storage.service';
// StorageService: Handles saving/loading favourites and settings

// Component Decorator

@Component({
  selector: 'app-recipe-details',          // HTML tag name
  templateUrl: './recipe-details.page.html', // Link to HTML template
  styleUrls: ['./recipe-details.page.scss'], // Link to styles
  standalone: true,                          // No NgModule required
  imports: [                                 // Dependencies for this component
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonImg,
    IonButton,
    IonBackButton,
    IonButtons,
    IonIcon,
    IonSpinner,
    IonList,
    IonItem,
    IonLabel,
  ],
})
export class RecipeDetailsPage implements OnInit {

  // Component Properties

  recipeId: number = 0;
  // Recipe ID passed from Home page via query params
  // Used to fetch full details from API
  
  recipeTitle: string = '';
  // Recipe name passed from Home page
  // Displayed in header and used when saving to favourites
  
  recipeImage: string = '';
  // Recipe image URL passed from Home page
  // Used when saving to favourites
  
  recipeDetails: RecipeDetails | null = null;
  // Full recipe data from API (ingredients, instructions)
  // null until API call completes
  
  isLoading: boolean = false;
  // Controls loading spinner visibility
  
  isFavourite: boolean = false;
  // Tracks if this recipe is in user's favourites
  // true = show "Remove From Favourites" button
  // false = show "Add To Favourites" button
  
  measurementUnit: string = 'metric';
  // User's preferred measurement system
  // 'metric' = grams, ml, etc.
  // 'us' = ounces, cups, etc.


  // Constructor - inject services

  constructor(
    private route: ActivatedRoute,           // Access URL query parameters
    private recipeService: RecipeService,    // Make API calls
    private storageService: StorageService   // Access favourites and settings
  ) {
    // Register heart icons for the favourite button
    addIcons({ heart, heartOutline });
  }


  // NGONINIT - runs whe the page loads

  async ngOnInit() {
    // Subscribe to query parameters from the URL
    // This extracts id, title, and image passed from Home page
    this.route.queryParams.subscribe(params => {
      this.recipeId = +params['id'];     // + converts string to number
      this.recipeTitle = params['title'];
      this.recipeImage = params['image'];
      this.loadRecipeDetails();           // Fetch full recipe from API
    });

    // Load the user's measurement preference from storage
    this.measurementUnit = await this.storageService.getMeasurementUnit();
    
    // Check if this recipe is already in favourites
    this.isFavourite = await this.storageService.isFavourite(this.recipeId);
  }


  // Load the receipe details from the API
 
  loadRecipeDetails() {
    this.isLoading = true;  // Show loading spinner
    
    // Call Spoonacular API for full recipe information
    this.recipeService.getRecipeDetails(this.recipeId).subscribe({
      
      // Store recipe data
      next: (details) => {
        this.recipeDetails = details;
        this.isLoading = false;  // Hide spinner
      },
      
      // If error then Log and hide spinner
      error: (error) => {
        console.error('Error fetching recipe details:', error);
        this.isLoading = false;
      }
    });
  }

 
  // Get the measurement string for an ingredient
 
  // Returns formatted measurement based on user's preference
  // Called in template for each ingredient
  getMeasurement(ingredient: any): string {
    if (this.measurementUnit === 'us') {
      // US measurements: "14.5 ounces"
      return `${ingredient.measures.us.amount} ${ingredient.measures.us.unitLong}`;
    } else {
      // Metric measurements
      return `${ingredient.measures.metric.amount} ${ingredient.measures.metric.unitLong}`;
    }
  }

  
  // Switch Favourite Status
 
  // Called when user clicks Add/Remove Favourites button
  async toggleFavourite() {
    // Create recipe object for storage
    const recipe: Recipe = {
      id: this.recipeId,
      title: this.recipeTitle,
      image: this.recipeImage
    };

    if (this.isFavourite) {
      // Currently a favourite then Remove it
      await this.storageService.removeFavourite(this.recipeId);
      this.isFavourite = false;
    } else {
      // Not a favourite then Add it
      await this.storageService.addFavourite(recipe);
      this.isFavourite = true;
    }
  }
}
