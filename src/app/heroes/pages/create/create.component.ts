import { Component, OnInit } from '@angular/core';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    },
  ];

  hero: Hero = {
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: '',
  }

  constructor(
    private heroService: HeroesService
  ) { }

  ngOnInit(): void {
  }

  saveHero() {
    if (this.hero.superhero.trim().length === 0) return;

    this.heroService.saveHero(this.hero)
      .subscribe(console.log)
  }

}
