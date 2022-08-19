import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './pages/create/create.component';
import { SearchComponent } from './pages/search/search.component';
import { HomeComponent } from './pages/home/home.component';
import { HeroComponent } from './pages/hero/hero.component';



@NgModule({
  declarations: [
    CreateComponent,
    SearchComponent,
    HomeComponent,
    HeroComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HeroesModule { }
