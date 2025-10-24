import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { GeoLocation, ForecastResponse } from '../models/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private geocodeUrl = 'https://geocoding-api.open-meteo.com/v1/search';
  private forecastUrl = 'https://api.open-meteo.com/v1/forecast';

  constructor(private http: HttpClient) {}

  searchLocations(query: string): Observable<GeoLocation[]> {
    if (!query || query.trim() === '') return of([]);
    const params = new HttpParams().set('name', query).set('count', '10');
    return this.http.get<any>(this.geocodeUrl, { params }).pipe(
      map(res => (res && res.results) ? res.results.map((r: any) => ({
        name: r.name,
        latitude: r.latitude,
        longitude: r.longitude,
        country: r.country,
        timezone: r.timezone
      })) : []),
      catchError(err => this.handleError(err))
    );
  }

  getForecast(lat: number, lon: number): Observable<ForecastResponse> {
    const params = new HttpParams()
      .set('latitude', lat.toString())
      .set('longitude', lon.toString())
      .set('hourly', 'temperature_2m')
      .set('timezone', 'auto');

    return this.http.get<ForecastResponse>(this.forecastUrl, { params }).pipe(
      catchError(err => this.handleError(err))
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('WeatherService error', error);
    const message = (error.error && error.error.message) ? error.error.message : error.message || 'Server error';
    return throwError(() => new Error(message));
  }
}
