import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageProbaComponent } from './image-proba.component';

describe('ImageProbaComponent', () => {
  let component: ImageProbaComponent;
  let fixture: ComponentFixture<ImageProbaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageProbaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageProbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
