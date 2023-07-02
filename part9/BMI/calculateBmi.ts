const calculateBmi = (height: number, weight: number): number => {
    const heightInMetre = height / 100;
    
    const heightInMetreSquare = heightInMetre * heightInMetre
    
    return weight / heightInMetreSquare;
}

console.log(calculateBmi(192, 60));
