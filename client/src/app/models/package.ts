export interface Package {
  weight: number; // min: 0.001, max: 999999999999
  length: number; // min: 1, max: 999999
  width: number;
  height: number;
  description?: string; // min: 1, max: 70
}
