/*
  Recipe Details Page Component
  
  This page displays full recipe information including:
  - Recipe title in header
  - Ingredients list with images and measurements
  - Cooking instructions (structured or raw)
  - Add/Remove Favourites button
  
  INNOVATION: Toast Notifications
  - Shows confirmation message when adding to favourites
  - Shows confirmation message when removing from favourites
  - Uses Ionic ToastController for native-feeling notifications
*/

// ============================================
// ANGULAR IMPORTS
// ============================================

import { Component, OnInit } from '@angular/core';
// Component: Decorator to define an Angular component
// OnInit: Lifecycle interface for initialization logic

import { CommonModule } from '@angular/common';
// CommonModule: Provides *ngIf and *ngFor directives

import { ActivatedRoute } from '@angular/router';
// ActivatedRoute: Service to access query parameters passed from Home page

// ============================================
// IONIC UI IMPORTS
// ============================================

import {
  IonHeader,        // Fixed header at top
  IonToolbar,       // Container for title and back button
  IonTitle,         // Page title (recipe name)
  IonContent,       // Scrollable content area
  IonCard,          // Card container for ingredients/instructions
  IonCardHeader,    // Card header section
  IonCardTitle,     // Title within card
  IonCardContent,   // Card body content
  IonImg,           // Image display for ingredient photos
  IonButton,        // Add to Favourites button
  IonBackButton,    // Back arrow to return to Home page
  IonButtons,       // Container for buttons in toolbar
  IonIcon,          // Heart icon for favourites
  IonSpinner,       // Loading animation
  IonList,          // List container for ingredients
  IonItem,          // Individual list item
  IonLabel,         // Text label for list items
  ToastController,  // INNOVATION: Controller for toast notifications
} from '@ionic/angular/standalone';

// ============================================
// IONICONS IMPORTS
// ============================================

import { addIcons } from 'ionicons';
// addIcons: Registers icons for use in template

import { heart, heartOutline } from 'ionicons/icons';
// heart: Filled heart icon (when recipe IS a favourite)
// heartOutline: Empty heart icon (when recipe is NOT a favourite)

// ============================================
// SERVICE IMPORTS
// ============================================

import { RecipeService, RecipeDetails, Recipe } from '../services/recipe.service';
// RecipeService: Handles API calls to Spoonacular
// RecipeDetails: Interface for full recipe data (ingredients, instructions)
// Recipe: Interface for basic recipe data (id, title, image)

import { StorageService } from '../services/storage.service';
// StorageService: Handles saving/loading favourites and settings

// ============================================
// COMPONENT DECORATOR
// ============================================

@Component({
  selector: 'app-recipe-details',            // HTML tag name
  templateUrl: './recipe-details.page.html', // Link to HTML template
  styleUrls: ['./recipe-details.page.scss'], // Link to styles
  standalone: true,                           // No NgModule required
  imports: [                                  // Dependencies for this component
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
    // Note: ToastController doesn't need to be in imports array
    // It's a service, not a component
  ],
})
export class RecipeDetailsPage implements OnInit {

  // ============================================
  // COMPONENT PROPERTIES
  // ============================================

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
  // Used as "recipeDetails" in template
  
  isLoading: boolean = false;
  // Controls loading spinner visibility
  // true = show spinner while fetching data
  
  isFavourite: boolean = false;
  // Tracks if this recipe is in user's favourites
  // true = show "Remove From Favourites" button
  // false = show "Add To Favourites" button
  
  measurementUnit: string = 'metric';
  // User's preferred measurement system
  // 'metric' = grams, ml, etc.
  // 'us' = ounces, cups, etc.
  // Loaded from StorageService

  // ============================================
  // CONSTRUCTOR
  // Dependency injection
  // ============================================

  constructor(
    private route: ActivatedRoute,            // Access URL query parameters
    private recipeService: RecipeService,     // Make API calls
    private storageService: StorageService,   // Access favourites and settings
    private toastController: ToastController  // INNOVATION: For toast notifications
  ) {
    // Register heart icons for the favourite button
    addIcons({ heart, heartOutline });
  }

  // ============================================
  // LIFECYCLE HOOKS
  // ============================================

  /*
    ngOnInit - Runs once when component is first created
    
    Extracts query parameters, loads settings and favourites status,
    then fetches full recipe details from API.
  */
  async ngOnInit() {
    // Subscribe to query parameters from the URL
    // This extracts id, title, and image passed from Home page
    this.route.queryParams.subscribe(params => {
      this.recipeId = +params['id'];      // + converts string to number
      this.recipeTitle = params['title'];
      this.recipeImage = params['image'];
      this.loadRecipeDetails();            // Fetch full recipe from API
    });

    // Load the user's measurement preference from storage
    // This determines whether to show US or Metric measurements
    this.measurementUnit = await this.storageService.getMeasurementUnit();
    
    // Check if this recipe is already in favourites
    // This determines the initial button text
    this.isFavourite = await this.storageService.isFavourite(this.recipeId);
  }

  // ============================================
  // DATA LOADING METHODS
  // ============================================

  /*
    loadRecipeDetails - Fetch full recipe info from API
    
    Calls Spoonacular API to get ingredients, instructions, etc.
    Updates recipeDetails property when complete.
  */
  loadRecipeDetails() {
    this.isLoading = true;  // Show loading spinner
    
    // Call Spoonacular API for full recipe information
    this.recipeService.getRecipeDetails(this.recipeId).subscribe({
      
      // SUCCESS: Store recipe data and hide spinner
      next: (details) => {
        this.recipeDetails = details;
        this.isLoading = false;
      },
      
      // ERROR: Log error and hide spinner
      error: (error) => {
        console.error('Error fetching recipe details:', error);
        this.isLoading = false;
      }
    });
  }

  // ============================================
  // MEASUREMENT HELPER METHOD
  // ============================================

  /*
    getMeasurement - Format ingredient measurement string
    
    @param ingredient - Ingredient object from API
    @returns Formatted string like "14.5 ounces" or "411 grams"
    
    Returns US or Metric measurements based on user's preference.
    Called in template for each ingredient.
  */
  getMeasurement(ingredient: any): string {
    if (this.measurementUnit === 'us') {
      // US measurements: "14.5 ounces"
      return `${ingredient.measures.us.amount} ${ingredient.measures.us.unitLong}`;
    } else {
      // Metric measurements: "411.068 grams"
      return `${ingredient.measures.metric.amount} ${ingredient.measures.metric.unitLong}`;
    }
  }

  // ============================================
  // FAVOURITES METHODS
  // ============================================

  /*
    toggleFavourite - Add or remove recipe from favourites
    
    Called when user clicks the Add/Remove Favourites button.
    Updates storage and button state accordingly.
    
    INNOVATION: Shows toast notification to confirm the action
  */
  async toggleFavourite() {
    // Create recipe object for storage
    // Only stores essential data (id, title, image)
    const recipe: Recipe = {
      id: this.recipeId,
      title: this.recipeTitle,
      image: this.recipeImage
    };

    if (this.isFavourite) {
      // Currently a favourite - Remove it
      await this.storageService.removeFavourite(this.recipeId);
      this.isFavourite = false;
      
      // INNOVATION: Show toast notification for removal
      await this.presentToast('Removed from Favourites', 'warning');
      
    } else {
      // Not a favourite - Add it
      await this.storageService.addFavourite(recipe);
      this.isFavourite = true;
      
      // INNOVATION: Show toast notification for addition
      await this.presentToast('Added to Favourites!', 'success');
    }
  }

  // ============================================
  // INNOVATION: TOAST NOTIFICATION METHOD
  // ============================================

  /*
    presentToast - Display a toast notification
    
    @param message - Text to display in the toast
    @param color - Ionic color name ('success', 'warning', 'danger', etc.)
    
    Creates and displays a toast notification at the bottom of the screen.
    Toast automatically dismisses after 2 seconds.
    Includes appropriate heart icon based on action type.
  */
  async presentToast(message: string, color: string) {
    // Create toast configuration
    const toast = await this.toastController.create({
      message: message,           // Text to display
      duration: 2000,             // Auto-dismiss after 2 seconds
      position: 'bottom',         // Show at bottom of screen
      color: color,               // 'success' = green, 'warning' = yellow
      icon: color === 'success' ? 'heart' : 'heart-outline'  // Filled heart for add, outline for remove
    });
    
    // Display the toast
    await toast.present();
  }
}