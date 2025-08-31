import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcompanharSolicitacaoComponent } from './acompanhar-solicitacao.component';

describe('AcompanharSolicitacaoComponent', () => {
  let component: AcompanharSolicitacaoComponent;
  let fixture: ComponentFixture<AcompanharSolicitacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcompanharSolicitacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcompanharSolicitacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
