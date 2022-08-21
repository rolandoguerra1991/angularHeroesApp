import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { switchMap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmComponent } from '../../components/delete-confirm/delete-confirm.component';

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
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {

    if(!this.router.url.includes('edit')) return;

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
        .subscribe(hero => this._snackBar.open('Hero edited!!', 'Close'))
    } else {
      this.heroService.saveHero(this.hero)
        .subscribe(hero => {
          this.router.navigate(['heroes/edit', hero.id]);
          this._snackBar.open('Hero created!!', 'Close');
        })

    }
  }

  deleteHero() {
    this.heroService.deleteHero(this.hero.id!)
      .subscribe(() => {
        this.router.navigate(['heroes/listing']);
        this._snackBar.open('Hero deleted!!', 'Close');
      });
  }

  showConfirmModal() {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '250px',
      data: this.hero
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
      this.deleteHero()
    })
  }

}
