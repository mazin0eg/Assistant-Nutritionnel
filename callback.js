
    function describeMeal(mealname , action){
            const meals = {
        burger: { 
            ingredients: ["pain", "steak haché", "fromage", "salade", "tomate", "sauce"],
            quantity: 1,
            nutrition: {
                calories: 550,
                protein: "25g",
                carbs: "40g",
                fat: "30g"
            }
        },
        pizza: { 
            ingredients: ["pâte", "sauce tomate", "mozzarella", "champignons", "jambon"],
            quantity: 1,
            nutrition: {
                calories: 700,
                protein: "30g",
                carbs: "90g",
                fat: "25g"
            }
        },
        juice: { 
            ingredients: ["orange", "pomme", "carotte"],
            quantity: "250ml",
            nutrition: {
                calories: 120,
                protein: "2g",
                carbs: "28g",
                fat: "0g"
            }
        },
        other: { 
            ingredients: ["salade verte", "huile d’olive", "vinaigre"],
            quantity: "150g",
            nutrition: {
                calories: 90,
                protein: "3g",
                carbs: "8g",
                fat: "5g"
            }
        }
    };

        
    const meal = meals[mealname]; 
    if (meal) {
        action(meal);
        
    }else{ 
        console.log(` ${mealname} makaynch`);
        }
            
    }


  describeMeal("pizza" , (data) =>{
    console.log(`hadchy li swin fih ${data.nutrition.calories}`)
  })