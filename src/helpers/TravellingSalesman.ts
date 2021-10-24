import { Place } from '../modules/places/places.schema';
import { Distance } from './Distance';
import { Permutation } from 'ts-combinatorics';

export class TravellingSalesman {
  private readonly places: Place[];
  public resultMap = new Map();
  private tempGraph: number[][];

  constructor(places: Place[]) {
    this.places = places;

    this.tempGraph = [];
    places.forEach(() => {
      this.tempGraph.push([]);
    });
  }

  generateDistanceBetweenEachPlace() {
    for (let i = 0; i < this.places.length; i++) {
      for (let j = i + 1; j < this.places.length; j++) {
        const distanceObject = new Distance(this.places[i], this.places[j]);
        const result = distanceObject.haversine_distance();
        this.resultMap.set(
          `${this.places[i].name}-${this.places[j].name}`,
          result,
        );
      }
    }
    return this.resultMap;
  }

  generateArrayGraph() {
    for (let i = 0; i < this.places.length; i++) {
      for (let j = 0; j < this.places.length; j++) {
        const distanceObject = new Distance(this.places[i], this.places[j]);
        const result = Math.round(distanceObject.haversine_distance());
        this.tempGraph[i][j] = result;
      }
    }
    return this.tempGraph;
  }

  travellingSalesmanProblem() {
    const sourceVertexIndex = 0;
    const iterationArray = [];
    for (let i = 1; i < this.places.length - 1; i++) {
      iterationArray.push(i);
    }

    const minPath = Number.MAX_VALUE;
    const permutations = new Permutation(iterationArray);
    console.log([...permutations]);
    return permutations;
  }
}
