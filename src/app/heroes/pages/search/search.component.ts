import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  criteria: string = '';
  heroes: Hero[] = [];
  heroSelected!: Hero | undefined;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  finding() {
    this.heroesService.getSuggestion(this.criteria)
      .subscribe(heroes => this.heroes = heroes)
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {

    if (!event.option.value) {
      this.heroSelected = undefined;
      return;
    }

    const hero: Hero = event.option.value;
    this.criteria = hero.superhero;
    this.heroesService.getHeroByID(hero.id!)
      .subscribe(hero => this.heroSelected = hero)
  }

}
