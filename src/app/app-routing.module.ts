import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthService } from './services/auth.service'

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [AuthService] },
  { path: 'map', loadChildren: './pages/map/map.module#MapPageModule' },
  { path: 'torneos', loadChildren: './pages/torneos/torneos.module#TorneosPageModule' },
  { path: 'socios', loadChildren: './pages/socios/socios.module#SociosPageModule' },
  { path: 'servicios', loadChildren: './pages/servicios/servicios.module#ServiciosPageModule' },  { path: 'settings', loadChildren: './pages/settings/settings.module#SettingsPageModule' },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
