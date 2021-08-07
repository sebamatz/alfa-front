

export type Data ={
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

export type HeadCell= {
  id: keyof Data;
  label: string;
  numeric: boolean;
}