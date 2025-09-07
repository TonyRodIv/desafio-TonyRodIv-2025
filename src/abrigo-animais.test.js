import { AbrigoAnimais } from "./abrigo-animais.js";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve retornar erro se uma pessoa tiver brinquedos duplicados', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,RATO,BOLA', 'LASER', 'Mimi');
    expect(resultado.erro).toBe('Brinquedo inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve retornar erro se a lista de animais tiver duplicados', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,BOLA', 'LASER', 'Rex,Rex');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve enviar animal para o abrigo se ambas as pessoas puderem adotá-lo', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('LASER,RATO,BOLA', 'LASER,RATO,BOLA', 'Bebe');
    expect(resultado.lista[0]).toBe('Bebe - abrigo');
    expect(resultado.erro).toBeFalsy();
  });

  test('Não deve permitir que uma pessoa adote mais de três animais', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,CAIXA,NOVELO,LASER', 
      'SKATE', 
      'Rex,Zero,Bola,Bebe');
    
    expect(resultado.lista).toContain('Rex - pessoa 1');
    expect(resultado.lista).toContain('Zero - pessoa 1');
    expect(resultado.lista).toContain('Bola - pessoa 1');
    expect(resultado.lista).toContain('Bebe - abrigo');
    expect(resultado.erro).toBeFalsy();
  });

  test('Deve permitir que Loco seja adotado com brinquedos fora de ordem', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('RATO,SKATE', 'BOLA', 'Loco');
    expect(resultado.lista[0]).toBe('Loco - pessoa 1');
    expect(resultado.erro).toBeFalsy();
  });
});