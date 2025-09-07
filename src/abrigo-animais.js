import { AnimaisDB } from "./animais-DB.js";

class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const brinquedosDasPessoas = [brinquedosPessoa1.split(','), brinquedosPessoa2.split(',')];
    const animaisConsiderados = ordemAnimais.split(',');

    const nomesAnimaisDB = Object.keys(AnimaisDB);
    for (const animal of animaisConsiderados) {
      if (!nomesAnimaisDB.includes(animal)) {
        return { erro: 'Animal inválido' };
      }
    }
    if (new Set(animaisConsiderados).size !== animaisConsiderados.length) {
      return { erro: 'Animal inválido' };
    }

    const brinquedosP1 = brinquedosDasPessoas[0];
    if (new Set(brinquedosP1).size !== brinquedosP1.length) {
      return { erro: 'Brinquedo inválido' };
    }

    const brinquedosP2 = brinquedosDasPessoas[1];
    if (new Set(brinquedosP2).size !== brinquedosP2.length) {
      return { erro: 'Brinquedo inválido' };
    }

    function verificarBrinquedos(brinquedosAnimal, brinquedosPessoa, animal) {
      if (animal.toUpperCase() === "LOCO") {
        return brinquedosAnimal.every(b => brinquedosPessoa.includes(b));
      }
      let i = 0;
      for (let j = 0; j < brinquedosPessoa.length; j++) {
        if (brinquedosPessoa[j] === brinquedosAnimal[i]) {
          i++;
          if (i === brinquedosAnimal.length) {
            return true;
          }
        }
      }
      return false;
    }

    const resultadoFinal = [];
    let adocoesPessoa1 = 0;
    let adocoesPessoa2 = 0;

    for (let animal of animaisConsiderados) {
      const brinquedosAnimal = AnimaisDB[animal].brinquedos;
      
      const pessoa1PodeAdotar = verificarBrinquedos(brinquedosAnimal, brinquedosDasPessoas[0], animal) && adocoesPessoa1 < 3;
      const pessoa2PodeAdotar = verificarBrinquedos(brinquedosAnimal, brinquedosDasPessoas[1], animal) && adocoesPessoa2 < 3;

      if (pessoa1PodeAdotar && pessoa2PodeAdotar) {
        resultadoFinal.push(`${animal} - abrigo`);
      } else if (pessoa1PodeAdotar) {
        resultadoFinal.push(`${animal} - pessoa 1`);
        adocoesPessoa1++;
      } else if (pessoa2PodeAdotar) {
        resultadoFinal.push(`${animal} - pessoa 2`);
        adocoesPessoa2++;
      } else {
        resultadoFinal.push(`${animal} - abrigo`);
      }
    }

    return {
      lista: resultadoFinal.sort((a, b) => a.localeCompare(b))
    };
  }
}

export { AbrigoAnimais as AbrigoAnimais };