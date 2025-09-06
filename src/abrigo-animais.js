import { AnimaisDB } from "./animais-DB.js";
console.log("Animais disponíveis:", Object.keys(AnimaisDB));

class AbrigoAnimais {
  encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
    brinquedosPessoa1 = brinquedosPessoa1.split(',')
    brinquedosPessoa2 = brinquedosPessoa2.split(',')
    ordemAnimais = ordemAnimais.split(',')

    for (animal of ordemAnimais) {
      
    }
  }
}

export { AbrigoAnimais as AbrigoAnimais };
