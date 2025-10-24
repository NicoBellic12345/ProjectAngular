import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { WeatherService } from '../../services/weather.service';
import { GeoLocation } from '../../models/weather.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  cityName: string = 'Almaty';
  locations$: Observable<GeoLocation[]> | undefined;
  private searchTerms = new Subject<string>();
  error: string | null = null;
  loading = false;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.locations$ = this.searchTerms.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap(() => this.loading = true),
      switchMap((term: string) => this.weatherService.searchLocations(term))
    );
  }

  onCityInput(value: string) {
    this.error = null;
    this.searchTerms.next(value);
  }

  selectLocation(loc: GeoLocation) {
    sessionStorage.setItem('selectedLocation', JSON.stringify(loc));
    window.location.href = '/list';
  }
}
