import { Place } from '../modules/places/places.schema';
import { Distance } from './Distance';
import { Permutation } from 'ts-combinatorics';

export class TravellingSalesman {
  private readonly places: Place[];
  private placeNameDistanceMap = new Map(); // for displaying distances between each city
  private tempPositionOfPlaceInGraph: string[] = []; // indicates position of city in graph by city name
  private resultTour: string[] = []; // result displayed in city names
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

  getResultTour() {
    return this.resultTour;
  }

  getResultPlaceOrder() {
    return this.resultPlaceOrder;
  }

  getPlaceNameDistanceMap() {
    return this.placeNameDistanceMap;
  }

  async generateDistanceBetweenEachPlace() {
    for (let i = 0; i < this.places.length; i++) {
      for (let j = i + 1; j < this.places.length; j++) {
        const distanceObject = new Distance(this.places[i], this.places[j]);
        const result = distanceObject.haversine_distance();
        this.placeNameDistanceMap.set(
          `${this.places[i].name}-${this.places[j].name}`,
          result,
        );
      }
    }
    return this.placeNameDistanceMap;
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
    if (this.places.length > 15) {
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
      const tempTour = [];

      const tempResultPlaceOrder = [];
      tempResultPlaceOrder.push(this.places[sourceVertexIndex]);

      // compute current path weight
      let i = sourceVertexIndex;
      for (const j of perm) {
        currentWeight += this.tempGraph[i][j];
        tempTour.push(
          `${this.tempPositionOfPlaceInGraph[i]} -> ${this.tempPositionOfPlaceInGraph[j]}`,
        );
        tempResultPlaceOrder.push(this.places[j]);
        i = j;
      }
      currentWeight += this.tempGraph[i][sourceVertexIndex];
      tempTour.push(
        `${this.tempPositionOfPlaceInGraph[i]} -> ${this.tempPositionOfPlaceInGraph[sourceVertexIndex]}`,
      );
      tempResultPlaceOrder.push(this.places[sourceVertexIndex]);

      if (currentWeight < minPath) {
        minPath = currentWeight;
        this.resultTour = [];
        this.resultTour = [...tempTour];

        this.resultPlaceOrder = [];
        this.resultPlaceOrder = [...tempResultPlaceOrder];
      }
    }

    this.minimalDistance = minPath;
    return this.resultPlaceOrder;
  }
}
