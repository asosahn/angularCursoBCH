import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombinadoArtistaComponent } from './combinado-artista.component';

describe('CombinadoArtistaComponent', () => {
  let component: CombinadoArtistaComponent;
  let fixture: ComponentFixture<CombinadoArtistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombinadoArtistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombinadoArtistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
