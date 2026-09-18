export interface City {
    CityCode: string;
    CityName: string;
    Temp: string;
    Status: string;
}

export interface CitiesPayload {
  List: City[];
}