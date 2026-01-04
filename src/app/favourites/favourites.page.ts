
// Favourites Page
// This page displays all recipes the user has saved
// as favourites. Users can tap DETAILS to view
// the full recipe, or remove it from favourites
// on the Recipe Details page.

// Angular Imports

import { Component, OnInit } from '@angular/core';
// Component: Decorator to define an Angular component
// OnInit: Lifecycle interface for initialization logic

import { CommonModule } from '@angular/common';
// CommonModule: Provides *ngIf and *ngFor directives

import { Router } from '@angular/router';
// Router: Service for navigating between pages


// Ionic UI Imports

import {
  IonHeader,        // Fixed header at top
  IonToolbar,       // Container for title and buttons
  IonTitle,         // Page title ("Favourites Recipes")
  IonContent,       // Scrollable content area
  IonList,          // Container for recipe cards
  IonCard,          // Card component for each recipe
  IonCardHeader,    // Card header section
  IonCardTitle,     // Recipe title in card
  IonCardContent,   // Card content area
  IonImg,           // Image component for recipe photos
  IonButton,        // DETAILS button
  IonBackButton,    // Back arrow to return to Home
  IonButtons,       // Container for buttons in toolbar
  IonText,          // Text component for empty state message
} from '@ionic/angular/standalone';


// Service and type Imports 

import { StorageService } from '../services/storage.service';
// StorageService: Handles loading favourites from Ionic Storage

import { Recipe } from '../services/recipe.service';
// Recipe: TypeScript interface defining recipe structure

// Components
@Component({
  selector: 'app-favourites',              // HTML tag name
  templateUrl: './favourites.page.html',   // Link to HTML template
  styleUrls: ['./favourites.page.scss'],   // Link to styles
  standalone: true,                         // No NgModule required
  imports: [                                // Dependencies for this component
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonImg,
    IonButton,
    IonBackButton,
    IonButtons,
    IonText,
  ],
})
export class FavouritesPage implements OnInit {

  // COMPONENT PROPERTIES
  favourites: Recipe[] = [];
  // Array to store favourite recipes loaded from storage
  // Each recipe has: id, title, image

  
  // Inject services in the constructor
  
  constructor(
    private storageService: StorageService,  // For loading favourites
    private router: Router                    // For navigation to details
  ) {}

  // NgOnInit - runs once when component initializes
  async ngOnInit() {
    // Load favourites when page initializes
    await this.loadFavourites();
  }

  // Ion view Will Enter - runs each time page appears

  // This is an Ionic lifecycle hook
  // This ensures the list updates after removing a favourite
  async ionViewWillEnter() {
    await this.loadFavourites();
  }


  // Load Favourites from Storage

  async loadFavourites() {
    // Get all saved favourites from Ionic Storage
    // Returns empty array if no favourites saved
    this.favourites = await this.storageService.getFavourites();
  }

// Navigation to Recipe Details Page

  // Called when user taps the DETAILS button on a recipe card
  viewDetails(recipe: Recipe) {
    // Navigate to recipe-details page with recipe info as query params
    // This allows the details page to load full recipe information
    this.router.navigate(['/recipe-details'], {
      queryParams: {
        id: recipe.id,        // Recipe ID for API call
        title: recipe.title,  // Recipe title for display
        image: recipe.image   // Recipe image URL
      }
    });
  }
}