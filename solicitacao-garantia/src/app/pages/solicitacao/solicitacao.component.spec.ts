import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitacaoComponent } from './solicitacao.component';
import { SolicitacaoService } from '../../service/solicitacao.service';
import { of, throwError } from 'rxjs';

describe('SolicitacaoComponent', () => {
  let component: SolicitacaoComponent;
  let fixture: ComponentFixture<SolicitacaoComponent>;
  let mockService: jasmine.SpyObj<SolicitacaoService>;

  beforeEach(async () => {
    mockService = jasmine.createSpyObj('SolicitacaoService', ['enviarSolicitacao']);

    await TestBed.configureTestingModule({
      imports: [SolicitacaoComponent, ReactiveFormsModule],
      providers: [
        { provide: SolicitacaoService, useValue: mockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o formulário com valores vazios', () => {
    const form = component.solicitacaoForm;
    expect(form).toBeTruthy();
    expect(form.get('marca')?.value).toBe('');
    expect(form.get('modelo')?.value).toBe('');
    expect(form.get('notaFiscal')?.value).toBe('');
  });

  it('deve atualizar modelosDisponiveis quando a marca mudar', () => {
    component.solicitacaoForm.get('marca')?.setValue('samsung');
    component.atualizarModelos();
    expect(component.modelosDisponiveis).toEqual(['Galaxy S22', 'Galaxy A54', 'Galaxy Note 20']);

    component.solicitacaoForm.get('marca')?.setValue('lg');
    component.atualizarModelos();
    expect(component.modelosDisponiveis).toEqual(['LG Velvet', 'LG K52', 'LG Wing']);
  });

  it('não deve enviar a solicitação se o formulário estiver inválido', () => {
    spyOn(component.solicitacaoForm, 'markAllAsTouched');
    component.enviarSolicitacao();
    expect(component.solicitacaoForm.markAllAsTouched).toHaveBeenCalled();
    expect(mockService.enviarSolicitacao).not.toHaveBeenCalled();
  });

  it('deve chamar o serviço e mostrar modal de sucesso ao enviar formulário válido', () => {
    component.solicitacaoForm.setValue({
      marca: 'samsung',
      modelo: 'Galaxy S22',
      notaFiscal: '12345',
      dataCompra: '2022-01-01',
      tipoDefeito: 'tela',
      descricao: 'Tela quebrada'
    });

    mockService.enviarSolicitacao.and.returnValue(of({}));

    component.enviarSolicitacao();

    expect(mockService.enviarSolicitacao).toHaveBeenCalled();
    expect(component.showModal).toBeTrue();
    expect(component.modalTitle).toBe('Sucesso!');
  });

  it('deve mostrar modal de erro se o serviço falhar', () => {
    component.solicitacaoForm.setValue({
      marca: 'samsung',
      modelo: 'Galaxy S22',
      notaFiscal: '12345',
      dataCompra: '2022-01-01',
      tipoDefeito: 'tela',
      descricao: 'Tela quebrada'
    });

    mockService.enviarSolicitacao.and.returnValue(throwError(() => new Error('Falha')));

    component.enviarSolicitacao();

    expect(mockService.enviarSolicitacao).toHaveBeenCalled();
    expect(component.showModal).toBeTrue();
    expect(component.modalTitle).toBe('Erro!');
  });
});
