import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './pages/create/create.component';
import { SearchComponent } from './pages/search/search.component';
import { HomeComponent } from './pages/home/home.component';
import { HeroComponent } from './pages/hero/hero.component';
import { ListingComponent } from './pages/listing/listing.component';
import { HeroesRoutingModule } from './heroes-routing.module';



@NgModule({
  declarations: [
    CreateComponent,
    SearchComponent,
    HomeComponent,
    HeroComponent,
    ListingComponent,
  ],
  imports: [
    CommonModule,
    HeroesRoutingModule
  ]
})
export class HeroesModule { }
