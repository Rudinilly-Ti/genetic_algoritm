//Função de criação da população inicial, recebendo o tamanho da população e retornando um array de objetos;
function Population(size) {
  let population = [];

  for (let i = 0; i < size; i++) {
    population.push({ X: Math.floor(Math.random() * 8), Y: Math.floor(Math.random() * 8) });
  }

  return population;
}

//Função de aptidão, recebendo um array de objetos e retornando um array de objetos com a aptidão calculada;
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

function AptAcumulada(population) {
  let ordenedPopulation = SortPopulation(population);
  let acumulada = 0;
  ordenedPopulation.forEach(element => {
    acumulada += element.aptidao;
    element.AptAcumulada = acumulada;
  });

  return population;
}

//Função de seleção dos melhores, recebendo um array de objetos e retornando um array de objetos com os selecionados;
function Selected(population) {
  let acumulada = population[population.length - 1].AptAcumulada;
  let selected = [];

  for (let i = 0; i < 4; i++) {
    let random = Math.random() * acumulada;
    selected.push(population.find(element => element.AptAcumulada > random));
  }

  return selected;
}

//Função de cruzamento, recebendo um array de objetos e retornando um array de objetos cruzados;
function CrossOver(bests) {
  let newPopulation = [];

  for (let i = 0, j = 1; j < bests.length; i += 2, j += 2) {
    newPopulation.push({ X: bests[i].X, Y: bests[j].Y });
  }

  return newPopulation;
}

//Função de mutação, recebendo um array de objetos e retornando um array de objetos mutados;
function Mutation(population) {
  population.forEach(element => {
    if (Math.random() < 0.1) {
      element.X = element.X & Math.floor(Math.random() * 8);
      element.Y = element.Y & Math.floor(Math.random() * 8);
      element.aptidao = Math.sqrt((element.X ** 3) + (2 * element.Y ** 4));
    }
  });

  return population;
}

//Função de criação da nova população, recebendo um array de objetos e retornando um array com a nova população;
function NewGeneration(population) {
  let selected = Selected(AptAcumulada((population)));
  let newPopulation = CrossOver(selected);
  let mutation = Mutation(newPopulation);

  population[population.length - 2] = mutation[0];
  population[population.length - 1] = mutation[1];
  return population;
}


//Função de avaliação da população, recebendo um array de objetos e retornando um objeto com o melhor indivíduo;
function Valuate(population) {
  return SortPopulation(population)[0];
}

//Criação da população inicial;
const population = AptAcumulada(Fitness(Population(10)));
console.log("População Inicial:",);
console.table(population);
//Avaliação da população inicial;
const best = Valuate(population);
console.log("Melhor Indivíduo:", best);

//Criação da nova população;

for (let index = 0; index < 4; index++) {
  let newGeneration = AptAcumulada(Fitness(NewGeneration(population)));
  console.log("Geração:", index + 1);
  console.table(newGeneration);
  //Avaliação da nova população;
  let newBest = Valuate(newGeneration);
  console.log("Melhor Indivíduo", newBest);
  if (newBest.X === 0 && newBest.Y === 0) {
    console.log("Solução encontrada!");
    break;
  }
}

