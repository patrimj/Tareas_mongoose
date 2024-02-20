import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioProgramadorComponent } from './inicio-programador.component';

describe('InicioProgramadorComponent', () => {
  let component: InicioProgramadorComponent;
  let fixture: ComponentFixture<InicioProgramadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioProgramadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InicioProgramadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
