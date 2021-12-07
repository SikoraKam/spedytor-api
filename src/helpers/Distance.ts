import { Place } from '../modules/places/places.schema';

export class Distance {
  private place1: Place;
  private place2: Place;

  constructor(place1: Place, place2: Place) {
    this.place1 = place1;
    this.place2 = place2;
  }

  haversine_distance() {
    const R = 6371.071; // Promień Ziemi w kilometrach
    const radiansLat1 = this.place1.latitude * (Math.PI / 180);
    const radiansLat2 = this.place2.latitude * (Math.PI / 180);
    const differenceLatitude = radiansLat2 - radiansLat1;
    const differenceLongitude =
      (this.place1.longitude - this.place2.longitude) * (Math.PI / 180);

    return (
      2 *
      R *
      Math.asin(
        Math.sqrt(
          Math.sin(differenceLatitude / 2) * Math.sin(differenceLatitude / 2) +
            Math.cos(radiansLat1) *
              Math.cos(radiansLat2) *
              Math.sin(differenceLongitude / 2) *
              Math.sin(differenceLongitude / 2),
        ),
      )
    );
  }
}
