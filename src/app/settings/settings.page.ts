/*
  Settings Page Component
  Allows users to select their preferred measurement units (Metric or US)
  Uses Ionic Storage to persist the user's preference
*/
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonRadioGroup,
  IonRadio,
  IonBackButton,
  IonButtons,
  IonText  // ADD THIS
} from '@ionic/angular/standalone';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonRadioGroup,
    IonRadio,
    IonBackButton,
    IonButtons,
    IonText  // ADD THIS - removed IonLabel since it's not used
  ]
})
export class SettingsPage implements OnInit {
  // Stores the current measurement unit preference
  // Default is 'metric' if no preference has been saved
  measurementUnit: string = 'metric';

  constructor(private storageService: StorageService) {}

  // Load saved preference when component initializes
  async ngOnInit() {
    const savedUnit = await this.storageService.getMeasurementUnit();
    if (savedUnit) {
      this.measurementUnit = savedUnit;
    }
  }

  // Save preference when user changes selection
  async onMeasurementChange(event: any) {
    const value = event.detail.value;
    await this.storageService.setMeasurementUnit(value);
  }
}