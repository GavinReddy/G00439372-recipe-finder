import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Recipe {
  id: number;
  title: string;
  image: string;
  imageType?: string;
}

export interface RecipeSearchResponse {
  results: Recipe[];
  offset: number;
  number: number;
  totalResults: number;
}

export interface Ingredient {
  id: number;
  aisle: string;
  image: string;
  consistency: string;
  name: string;
  nameClean: string;
  original: string;
  originalName: string;
  amount: number;
  unit: string;
  measures: {
    us: {
      amount: number;
      unitShort: string;
      unitLong: string;
    };
    metric: {
      amount: number;
      unitShort: string;
      unitLong: string;
    };
  };
}

export interface InstructionStep {
  number: number;
  step: string;
}

export interface AnalyzedInstruction {
  name: string;
  steps: InstructionStep[];
}

export interface RecipeDetails {
  id: number;
  title: string;
  image: string;
  servings: number;
  readyInMinutes: number;
  extendedIngredients: Ingredient[];
  analyzedInstructions: AnalyzedInstruction[];
  instructions: string;
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiKey = '70759a4f7911402abcc53d3c51d3b759';
  private baseUrl = 'https://api.spoonacular.com';

  constructor(private http: HttpClient) {}

  searchRecipes(ingredients: string): Observable<RecipeSearchResponse> {
    const url = `${this.baseUrl}/recipes/complexSearch?query=${encodeURIComponent(ingredients)}&apiKey=${this.apiKey}`;
    return this.http.get<RecipeSearchResponse>(url);
  }

  getRecipeDetails(id: number): Observable<RecipeDetails> {
    const url = `${this.baseUrl}/recipes/${id}/information?apiKey=${this.apiKey}`;
    return this.http.get<RecipeDetails>(url);
  }
}