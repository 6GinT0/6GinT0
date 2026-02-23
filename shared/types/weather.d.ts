type Weather = {
  productstring: string;
  initstring: string;
  dataseries: {
    date: string;
    temp2m: number;
    wind10m: number;
    wind10m_direction: string;
    weather: string;
  }[];
};
