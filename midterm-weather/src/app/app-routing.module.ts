import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ForecastListComponent } from './components/forecast-list/forecast-list.component';
import { ForecastDetailComponent } from './components/forecast-detail/forecast-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'list', component: ForecastListComponent },
  { path: 'detail', component: ForecastDetailComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
