export interface GeoLocation {
  name: string;
  latitude: number;
  longitude: number;
  country?: string;
  timezone?: string;
}

export interface HourlyForecast {
  time: string[]; // ISO strings
  temperature_2m: number[]; // temperatures aligned with time
}

export interface ForecastResponse {
  latitude: number;
  longitude: number;
  hourly: HourlyForecast;
}
