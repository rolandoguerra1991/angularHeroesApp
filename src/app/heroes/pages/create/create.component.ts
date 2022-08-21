import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';

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
    private heroService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.heroService.getHeroByID(id))
      )
      .subscribe((hero) => this.hero = hero)
  }

  saveHero() {
    if (this.hero.superhero.trim().length === 0) return;

    if (this.hero.id) {
      this.heroService.updateHero(this.hero)
        .subscribe(hero => console.log('updated hero', hero))
    } else {
      this.heroService.saveHero(this.hero)
        .subscribe(hero => this.router.navigate(['heroes/edit', hero.id]))
    }
  }

}
