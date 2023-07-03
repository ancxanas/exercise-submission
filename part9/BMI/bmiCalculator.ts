const calculateBmi = (height: number, weight: number): string => {
    const heightInMetre = height / 100;
    
    const heightInMetreSquare = heightInMetre * heightInMetre;
    
    const bmi = Number((weight / heightInMetreSquare).toFixed(1));

    return bmiResult(bmi)
}

const bmiResult = (bmi: number): string => {
    if (bmi < 16.0) {
        return 'Underweight (Severe thinness)'
    } else if (bmi >= 16.0 && bmi <= 16.9) {
        return 'Underweight (Moderate thinness)'
    } else if (bmi >= 17.0 && bmi <= 18.4) {
        return 'Underweight (Mild thinness)'
    } else if (bmi >= 25.0 && bmi <= 29.9) {
        return 'Overweight (Pre-obese)'
    } else if (bmi >= 30.0 && bmi <= 34.9) {
        return 'Obese (Class I)'
    } else if (bmi >= 35.0 && bmi <= 39.9) {
        return 'Obese (Class II)'
    } else if (bmi > 40.0) {
        return 'Obese (Class III)'
    }
    else {
        return 'Normal (healthy weight)'
    }
}

console.log(calculateBmi(192, 100));
