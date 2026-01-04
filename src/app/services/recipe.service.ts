/*
  Recipe Service
  
  This service handles all API communication with Spoonacular.
  It provides methods for:
  - Searching recipes by ingredients
  - Getting detailed recipe information
  
  INNOVATION: Added readyInMinutes to Recipe interface for cooking time display
  INNOVATION: Added addRecipeInformation=true parameter to get cooking time in search results
*/

import { Injectable } from '@angular/core';
// Injectable: Decorator that marks this class as available for dependency injection

import { HttpClient } from '@angular/common/http';
// HttpClient: Angular's HTTP client for making API requests

import { Observable } from 'rxjs';
// Observable: RxJS type for handling asynchronous data streams

// ============================================
// TYPESCRIPT INTERFACES
// These define the shape of data we expect from the API
// ============================================

/*
  Recipe Interface
  Represents a single recipe in search results
  Used by Home page to display recipe cards
  
  INNOVATION: Added optional readyInMinutes property
  This allows us to display cooking time on recipe cards
*/
export interface Recipe {
  id: number;           // Unique recipe identifier from Spoonacular
  title: string;        // Recipe name (e.g., "Slow Cooker Beef Stew")
  image: string;        // URL to recipe image
  imageType?: string;   // Optional: Image format (e.g., "jpg")
  readyInMinutes?: number;  // INNOVATION: Cooking time in minutes (optional because not all API calls return this)
}

/*
  RecipeSearchResponse Interface
  Represents the full response from the complexSearch API endpoint
  Contains an array of recipes plus pagination info
*/
export interface RecipeSearchResponse {
  results: Recipe[];    // Array of matching recipes
  offset: number;       // Pagination offset
  number: number;       // Number of results returned
  totalResults: number; // Total matching recipes in database
}

/*
  Ingredient Interface
  Represents a single ingredient in a recipe
  Contains measurement data for both US and Metric units
*/
export interface Ingredient {
  id: number;           // Unique ingredient ID
  aisle: string;        // Store aisle (e.g., "Produce")
  image: string;        // Ingredient image filename
  consistency: string;  // Consistency type (e.g., "SOLID", "LIQUID")
  name: string;         // Ingredient name (e.g., "carrots")
  nameClean: string;    // Clean name without preparation info
  original: string;     // Original text (e.g., "2 large carrots, chopped")
  originalName: string; // Original ingredient name
  amount: number;       // Amount needed
  unit: string;         // Unit of measurement
  measures: {           // Measurement conversions
    us: {               // US measurements
      amount: number;   // Amount in US units
      unitShort: string; // Short unit (e.g., "oz")
      unitLong: string;  // Long unit (e.g., "ounces")
    };
    metric: {           // Metric measurements
      amount: number;   // Amount in metric units
      unitShort: string; // Short unit (e.g., "g")
      unitLong: string;  // Long unit (e.g., "grams")
    };
  };
}

/*
  InstructionStep Interface
  Represents a single step in cooking instructions
*/
export interface InstructionStep {
  number: number;  // Step number (1, 2, 3, etc.)
  step: string;    // Step instruction text
}

/*
  AnalyzedInstruction Interface
  Represents a group of cooking instructions
  Some recipes have multiple instruction groups
*/
export interface AnalyzedInstruction {
  name: string;              // Instruction group name (often empty)
  steps: InstructionStep[];  // Array of steps
}

/*
  RecipeDetails Interface
  Represents full recipe information from the /information endpoint
  Contains ingredients, instructions, and metadata
*/
export interface RecipeDetails {
  id: number;                                    // Recipe ID
  title: string;                                 // Recipe name
  image: string;                                 // Recipe image URL
  servings: number;                              // Number of servings
  readyInMinutes: number;                        // Total cooking time
  extendedIngredients: Ingredient[];             // Array of ingredients
  analyzedInstructions: AnalyzedInstruction[];   // Structured instructions
  instructions: string;                          // Raw HTML instructions (fallback)
}

// ============================================
// RECIPE SERVICE CLASS
// ============================================

@Injectable({
  providedIn: 'root'  // Service is available application-wide
})
export class RecipeService {
  
  // Spoonacular API credentials
  // This key is provided in the project requirements
  private apiKey = '70759a4f7911402abcc53d3c51d3b759';
  
  // Base URL for all Spoonacular API calls
  private baseUrl = 'https://api.spoonacular.com';

  // Inject HttpClient for making HTTP requests
  constructor(private http: HttpClient) {}

  /*
    searchRecipes - Search for recipes by ingredients
    
    @param ingredients - Comma-separated ingredients (e.g., "carrots,beef,potatoes")
    @returns Observable<RecipeSearchResponse> - Stream of search results
    
    Uses the complexSearch endpoint which provides flexible recipe searching
    
    INNOVATION: Added &addRecipeInformation=true parameter
    This tells the API to include additional recipe data like readyInMinutes
    in the search results, allowing us to display cooking time on recipe cards
    without making additional API calls
  */
  searchRecipes(ingredients: string): Observable<RecipeSearchResponse> {
    // Build the API URL with query parameters
    // encodeURIComponent ensures special characters are properly escaped
    // addRecipeInformation=true is the INNOVATION that returns cooking time
    const url = `${this.baseUrl}/recipes/complexSearch?query=${encodeURIComponent(ingredients)}&apiKey=${this.apiKey}&addRecipeInformation=true`;
    
    // Make GET request and return Observable
    // The generic <RecipeSearchResponse> tells TypeScript what type to expect
    return this.http.get<RecipeSearchResponse>(url);
  }

  /*
    getRecipeDetails - Get full recipe information by ID
    
    @param id - Recipe ID from search results
    @returns Observable<RecipeDetails> - Stream of full recipe data
    
    Uses the /information endpoint to get ingredients, instructions, etc.
  */
  getRecipeDetails(id: number): Observable<RecipeDetails> {
    // Build the API URL with recipe ID in the path
    const url = `${this.baseUrl}/recipes/${id}/information?apiKey=${this.apiKey}`;
    
    // Make GET request and return Observable
    return this.http.get<RecipeDetails>(url);
  }
}