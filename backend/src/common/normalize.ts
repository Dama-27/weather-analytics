export function calculateFeelsLikeScore(value: number): number {
    if (value <= 5) {
      return 0;
    }
    else if (value <= 20) {
      return 30;
    }
    else if (value <= 22) {
      return 70;
    }
    else if (value <= 24) {
      return 95;
    }
    else if (value <= 26) {
      return 100;
    }
    else if (value <= 28) {
      return 95;
    }
    else if (value <= 30) {
      return 80;
    }
    else if (value <= 32) {
      return 60;
    }
    else if (value <= 34) {
      return 35;
    }
    else if (value <= 36) {
      return 15;
    }
    return 0;
}

export function calculateHumidityScore(value: number): number {
    if (value <= 0) {
      return 40;
    }
    else if (value <= 20) {
      return 65;
    }
    else if (value <= 30) {
      return 75;
    }
    else if (value <= 40) {
      return 90;
    }
    else if (value <= 60) {
      return 100;
    }
    else if (value <= 70) {
      return 85;
    }
    else if (value <= 80) {
      return 60;
    }
    else if (value <= 90) {
      return 30;
    }
    return 10;
}

export function calculateWindScore(value: number): number {
    if (value <= 0) {
      return 60;
    }
    else if (value <= 5) {
      return 80;
    }
    else if (value <= 15) {
      return 100;
    }
    else if (value <= 20) {
      return 90;
    }
    else if (value <= 30) {
      return 70;
    }
    else if (value <= 40) {
      return 40;
    }
    return 10;
}

export function calculateRainScore(value: number| undefined): number {
  if(value == undefined || null)
  {
    return 100;
  }
    if (value <= 0) {
      return 100;
    }
    else if (value <= 0.5) {
      return 90;
    }
    else if (value <= 2) {
      return 70;
    }
    else if (value <= 5) {
      return 45;
    }
    else if (value <= 10) {
      return 25;
    }
    return 5;
}
