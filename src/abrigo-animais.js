import { AnimaisDB } from "./animais-DB.js";
console.log("Animais disponíveis:", Object.keys(AnimaisDB));

class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    const brinquedosDasPessoas = [brinquedosPessoa1.split(','), brinquedosPessoa2.split(',')]
    ordemAnimais = ordemAnimais.split(',')

    function verificarBrinquedos(brinquedosAnimal, brinquedosPessoa, animal) {
      // return JSON.stringify(brinquedosAnimal) === JSON.stringify(brinquedosPessoa)
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
    }


    for (let animal of ordemAnimais) {
      let podeAdotar = [animal]
      const brinquedosAnimal = AnimaisDB[animal].brinquedos

      for (let brinquedosPessoa of brinquedosDasPessoas) {
        podeAdotar.push(verificarBrinquedos(brinquedosAnimal, brinquedosPessoa, animal))
      }
      if (podeAdotar.filter(v => v === true).length > 1) {
        console.log(animal + ' não pode ser adotado, vai voltar pro abrigo');
      } else if (podeAdotar.length > 2) {
        if (podeAdotar[1] === true) {
          console.log('Primeira pessoa pode adotar o ' + animal);
        }
        if (podeAdotar[2] === true) {
          console.log('Segunda pessoa pode adotar o ' + animal);
        }
      } else {
        console.log(animal + "Não pode ser adotado por ninguém")
      }
    }
  }
}

export { AbrigoAnimais as AbrigoAnimais };
