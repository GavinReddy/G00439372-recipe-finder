/*
  Home Page Component

  Main search page of the Recipe Finder application.

  INNOVATIONS:
  1. Recipe Count Display - Shows "Found X recipe(s)" after searching
  2. Cooking Time Display - Shows preparation time on recipe cards
  3. Loading Spinner - Visual feedback during API calls
  4. Error Handling - User-friendly error messages
*/

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
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
  IonText,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { heart, settings, timeOutline } from 'ionicons/icons';

import { RecipeService, Recipe } from '../services/recipe.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
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
    IonText,
  ],
})
export class HomePage {
  // User input for ingredients
  ingredients: string = '';

  // Array of recipes from API
  recipes: Recipe[] = [];

  // Loading state for spinner
  isLoading: boolean = false;

  // INNOVATION: Recipe count display
  recipeCount: number = 0;

  // INNOVATION: Error message display
  errorMessage: string = '';

  // Student number for header
  studentNumber: string = 'G00439372';

  constructor(
    private recipeService: RecipeService,
    private router: Router
  ) {
    addIcons({ heart, settings, timeOutline });
  }

  /*
    searchRecipes - Execute recipe search
    Uses Observable .subscribe() pattern (NOT async/await)
  */
  searchRecipes() {
    const query = this.ingredients.trim();

    // If empty input: clear UI and do nothing
    if (!query) {
      this.recipes = [];
      this.recipeCount = 0;
      this.errorMessage = '';
      this.isLoading = false;
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.recipeCount = 0;

    this.recipeService.searchRecipes(query).subscribe({
      next: (response) => {
        this.recipes = response.results;
        this.recipeCount = response.results.length;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching recipes:', error);
        this.errorMessage = 'Failed to search recipes. Please try again.';
        this.recipes = [];
        this.recipeCount = 0;
        this.isLoading = false;
      },
    });
  }

  /*
    viewDetails - Navigate to Recipe Details page
    Requirement: Details opens Recipe Details Page 
  */
  viewDetails(recipe: Recipe) {
    this.router.navigate(['/recipe-details'], {
      queryParams: {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
      },
    });
  }
viewRecipeDetails(recipe: Recipe) {
  this.viewDetails(recipe);
}

  /*
    goToFavourites - Navigate to Favourites page
  */
  goToFavourites() {
    this.router.navigate(['/favourite']);
  }

  /*
    goToSettings - Navigate to Settings page
  */
  goToSettings() {
    this.router.navigate(['/settings']);
  }
}
