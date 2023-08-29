import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomaticPostComponent } from './automatic-post.component';

describe('AutomaticPostComponent', () => {
  let component: AutomaticPostComponent;
  let fixture: ComponentFixture<AutomaticPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutomaticPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomaticPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
