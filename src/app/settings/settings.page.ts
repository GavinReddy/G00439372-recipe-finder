
// Settings Page Component
// This page allows users to change app settings.
// Currently supports toggling between Metric and US measurements.
// Settings are persisted using Ionic Storage.
// Angular Imports
import { Component, OnInit } from '@angular/core';
// Component: Decorator to define an Angular component
// OnInit: Lifecycle interface for initialization logic

import { CommonModule } from '@angular/common';
// CommonModule: Provides *ngIf and *ngFor directives

// Ionic UI Imports
import {
  IonHeader,       // Fixed header at top
  IonToolbar,      // Container for title and back button
  IonTitle,        // Page title ("Settings")
  IonContent,      // Scrollable content area
  IonList,         // Container for list items
  IonItem,         // Individual list item
  IonLabel,        // Text label for options
  IonRadioGroup,   // Groups radio buttons together
  IonRadio,        // Individual radio button (Metric/US)
  IonBackButton,   // Back arrow to return to Home
  IonButtons,      // Container for buttons in toolbar
} from '@ionic/angular/standalone';

// Service Imports
import { StorageService } from '../services/storage.service';
// StorageService: Handles saving/loading settings from Ionic Storage
// Component Decorator
@Component({
  selector: 'app-settings',              // HTML tag name
  templateUrl: './settings.page.html',   // Link to HTML template
  styleUrls: ['./settings.page.scss'],   // Link to styles
  standalone: true,                       // No NgModule required
  imports: [                              // Dependencies for this component
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonRadioGroup,
    IonRadio,
    IonBackButton,
    IonButtons,
  ],
})
export class SettingsPage implements OnInit {
  

  // Component Properties
  
  measurementUnit: string = 'metric';
  // Stores the user's selected measurement system
  // 'metric' = grams
  // 'us' = ounces
  // Bound to radio group in template

  // constructor

  constructor(private storageService: StorageService) {}
  // Inject StorageService to save/load measurement preference

  // NGONINIT - runs on component initialization

  async ngOnInit() {
    // Load the user's saved measurement preference from storage
    // If no preference saved, defaults to 'metric'
    this.measurementUnit = await this.storageService.getMeasurementUnit();
  }

  // Mearsurement Change Handler
  // Called when user selects a different radio button
  async onMeasurementChange(event: any) {
    // Extract the selected value from the event
    // event.detail.value = 'metric' or 'us'
    const value = event.detail.value;
    
    // Save the new preference to Ionic Storage
    // This persists even after app closes
    await this.storageService.setMeasurementUnit(value);
    
    // Update the local property to reflect the change
    this.measurementUnit = value;
  }
}
