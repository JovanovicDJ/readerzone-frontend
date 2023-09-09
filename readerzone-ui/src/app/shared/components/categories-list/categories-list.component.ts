import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  @Output()
  selectionChanged = new EventEmitter<Array<string>>();
  @ViewChildren(MatCheckbox) checkboxes!: QueryList<MatCheckbox>;
  selectedGenres: Array<string> = [];

  constructor() { }

  ngOnInit(): void {        
  }

  toggleCheckbox(genre: string) {
    if (this.selectedGenres.includes(genre)) {
      this.selectedGenres = this.selectedGenres.filter(g => g !== genre);
    } else {
      this.selectedGenres.push(genre);
    }
    this.selectionChanged.emit(this.selectedGenres);
  }

  uncheckCheckboxes() {
    this.checkboxes.forEach(checkbox => checkbox.checked = false);
  }

  checkCheckboxes(genres: Array<string>) {
    this.selectedGenres = genres;
    this.checkboxes.forEach(checkbox => {
      let name = checkbox.name;
      if (name && genres.includes(name)) {
        checkbox.checked = true;
      }
    });
  }

}
