import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { ForecastResponse, GeoLocation } from '../../models/weather.model';

@Component({
  selector: 'app-forecast-list',
  templateUrl: './forecast-list.component.html'
})
export class ForecastListComponent implements OnInit {
  location: GeoLocation | null = null;
  forecast: ForecastResponse | null = null;
  error: string | null = null;
  loading = false;
  showDetails = true;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    const raw = sessionStorage.getItem('selectedLocation');
    if (raw) {
      this.location = JSON.parse(raw) as GeoLocation;
      this.loadForecast();
    } else {
      this.error = 'Не выбран город. Вернитесь на Home и выберите город.';
    }
  }

  loadForecast() {
    if (!this.location) return;
    this.error = null;
    this.loading = true;
    this.weatherService.getForecast(this.location.latitude, this.location.longitude).subscribe({
      next: (res) => {
        this.forecast = res;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.message || 'Ошибка при получении прогноза';
        this.loading = false;
      }
    });
  }

  toggleDetails() {
    this.showDetails = !this.showDetails;
  }
}
