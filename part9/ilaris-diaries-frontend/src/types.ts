type Weather = 'rainy' | 'sunny' | 'windy' | 'cloudy' | 'stormy';

type Visibility = 'great' | 'good' | 'ok' | 'poor';

export interface Diary {
  id: number;
  date: string;
  visibility: Visibility;
  weather: Weather;
}
