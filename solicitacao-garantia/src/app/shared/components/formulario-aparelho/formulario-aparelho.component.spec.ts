import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAparelhoComponent } from './formulario-aparelho.component';

describe('FormularioAparelhoComponent', () => {
  let component: FormularioAparelhoComponent;
  let fixture: ComponentFixture<FormularioAparelhoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioAparelhoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioAparelhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
