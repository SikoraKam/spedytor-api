import { Place } from '../modules/places/places.schema';
import { Distance } from './Distance';
import { Permutation } from 'ts-combinatorics';

export class TravellingSalesman {
  private readonly places: Place[];
  private tempPositionOfPlaceInGraph: string[] = []; // indicates position of city in graph by city name
  private resultPlaceOrder: Place[] = []; // result which include objects of Places
  private readonly tempGraph: number[][]; // temporary graph represented in 2d array to for travellingSalesmanProblem()
  private minimalDistance = -1;

  constructor(places: Place[]) {
    this.places = places;

    this.tempGraph = [];
    places.forEach(() => {
      this.tempGraph.push([]);
    });
  }

  getMinimalDistance() {
    return this.minimalDistance;
  }

  async generateArrayGraph() {
    for (let i = 0; i < this.places.length; i++) {
      for (let j = 0; j < this.places.length; j++) {
        const distanceObject = new Distance(this.places[i], this.places[j]);
        const result = Math.round(distanceObject.haversine_distance());
        this.tempGraph[i][j] = result;
      }
      this.tempPositionOfPlaceInGraph[i] = this.places[i].name;
    }
    return this.tempGraph;
  }

  async travellingSalesmanProblem() {
    if (this.places.length > 11) {
      console.log('----Too many places - too big complexity---');
      return [];
    }

    // index of value 0 in tempGraph represent position of city in places array.
    await this.generateArrayGraph();

    const sourceVertexIndex = 0;
    let minPath = Number.MAX_VALUE;

    // creating array with values that represent index of graph vertex
    const iterationArray = [];
    for (let i = 1; i < this.tempGraph.length; i++) {
      iterationArray.push(i);
    }
    // creating array that contains permutations for vertex indexes
    const permutations = new Permutation(iterationArray);
    const permutationsArray = [...permutations];

    // check every possible permutation
    for (const perm of permutationsArray) {
      let currentWeight = 0;

      const tempResultPlaceOrder = [];
      tempResultPlaceOrder.push(this.places[sourceVertexIndex]);

      // compute current path weight
      let i = sourceVertexIndex;
      for (const j of perm) {
        currentWeight += this.tempGraph[i][j];
        tempResultPlaceOrder.push(this.places[j]);
        i = j;
      }
      currentWeight += this.tempGraph[i][sourceVertexIndex];
      tempResultPlaceOrder.push(this.places[sourceVertexIndex]);

      if (currentWeight < minPath) {
        minPath = currentWeight;

        this.resultPlaceOrder = [];
        this.resultPlaceOrder = [...tempResultPlaceOrder];
      }
    }
    this.minimalDistance = minPath;
    return this.resultPlaceOrder;
  }
}
