//Função de criação da população inicial, recebendo o tamanho da população e retornando um array de objetos;
function Population(size) {
  let population = [];

  for (let i = 0; i < size; i++) {
    population.push({ X: Math.floor(Math.random() * 8), Y: Math.floor(Math.random() * 8) });
  }

  return population;
}

//Função de criação da população inicial, recebendo o tamanho da população e retornando um array de objetos;
function Fitness(population) {
  population.forEach(element => {
    element.aptidao = Math.sqrt((element.X ** 3) + (2 * element.Y ** 4));
  });

  return population;
}


//Função de ordenação da população, recebendo um array de objetos e retornando um array de objetos ordenado;
function SortPopulation(population) {
  return population.sort((a, b) => a.aptidao - b.aptidao);
}

//Função de seleção dos melhores, recebendo um array de objetos e retornando um array de objetos com os melhores;
function Bests(population) {
  return population.slice(0, 10);
}

//Função de cruzamento, recebendo um array de objetos e retornando um array de objetos cruzados;
function CrossOver(bests) {
  let newPopulation = [];

  for (let i = 0; i < bests.length; i++) {
    for (let j = 0; j < bests.length; j++) {
      if (i !== j) {
        newPopulation.push({ X: bests[i].X, Y: bests[j].Y });
      }
    }
  }

  return newPopulation;
}

//Função de mutação, recebendo um array de objetos e retornando um array de objetos mutados;
function Mutation(population) {
  population.forEach(element => {
    if (Math.random() < 0.1) {
      element.X = Math.floor(Math.random() * 8);
      element.Y = Math.floor(Math.random() * 8);
    }
  });

  return population;
}

//Função de criação da nova população, recebendo um array de objetos e retornando um array com a nova população;
function NewGeneration(population) {
  let bests = Bests(SortPopulation(Fitness(population)));
  let newPopulation = CrossOver(bests);
  return Mutation(newPopulation);
}


//Função de avaliação da população, recebendo um array de objetos e retornando um objeto com o melhor indivíduo;
function Valuate(population) {
  return SortPopulation(Fitness(population))[0];
}

const population = Population(100);

let newGeneration = NewGeneration(population);

console.log("População Inicial:", population);
console.log("Melhor Indivíduo:", Valuate(population));

console.log("Nova geração: ", newGeneration);
console.log("Melhor Indivíduo", Valuate(newGeneration));