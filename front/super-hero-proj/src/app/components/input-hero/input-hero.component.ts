import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { CrudHeroService } from 'src/app/services/crud-hero.service';
import { Superhero } from 'src/app/interfaces/hero';

@Component({
  selector: 'app-input-hero',
  templateUrl: './input-hero.component.html',
  styleUrls: ['./input-hero.component.scss']
})
export class InputHeroComponent implements OnInit {
  public superheroImages = [];
  public createHeroForm: FormGroup;

  constructor(private crudHeroService: CrudHeroService, private fb: FormBuilder, ) {}

  ngOnInit(): void {
    this.createHero();
  }
  private createHero(): void {
    this.createHeroForm = this.fb.group({
      superheroNickname: [],
      superheroRealname: [],
      superheroOriginDescription: [],
      superPowers: [],
      catchPhrase: []
    });
  }
 public addPhoto(event) {
    const uploadFile = event.target.files[0];
    this.superheroImages[0] = uploadFile;
    // this.helpersService.heroImageUrl = URL.createObjectURL(uploadFile);
    // this.renderer.setStyle(this.changePhoto.nativeElement, 'backgroundImage', `url(${this.url})`);
    // this.renderer.setStyle(this.changePhoto.nativeElement, 'backgroundSize', '100% 100%');
  }

public onsubmitHeroForm() {
  if (this.createHeroForm.valid) {
    const newSuperhero: Superhero = this.createHeroForm.value;
    this.crudHeroService.postSuperhero(newSuperhero);
    this.createHeroForm.reset();
    }
  }
}
