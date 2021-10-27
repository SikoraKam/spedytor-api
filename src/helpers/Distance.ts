import { Place } from '../modules/places/places.schema';

export class Distance {
  private place1: Place;
  private place2: Place;

  constructor(place1: Place, place2: Place) {
    this.place1 = place1;
    this.place2 = place2;
  }

  haversine_distance() {
    const R = 6371.071; // Radius of the Earth in km
    const rlat1 = this.place1.latitude * (Math.PI / 180); // Convert degrees to radians
    const rlat2 = this.place2.latitude * (Math.PI / 180); // Convert degrees to radians
    const difflat = rlat2 - rlat1; // Radian difference (latitudes)
    const difflon =
      (this.place1.longitude - this.place2.longitude) * (Math.PI / 180); // Radian difference (longitudes)

    return (
      2 *
      R *
      Math.asin(
        Math.sqrt(
          Math.sin(difflat / 2) * Math.sin(difflat / 2) +
            Math.cos(rlat1) *
              Math.cos(rlat2) *
              Math.sin(difflon / 2) *
              Math.sin(difflon / 2),
        ),
      )
    );
  }
}
