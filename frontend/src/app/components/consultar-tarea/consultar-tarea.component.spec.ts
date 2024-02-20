import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarTareaComponent } from './consultar-tarea.component';

describe('ConsultarTareaComponent', () => {
  let component: ConsultarTareaComponent;
  let fixture: ComponentFixture<ConsultarTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarTareaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultarTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
