const carMarket = require("./obj.js");


/* Agency Operations*/


/* Search for a car agency by its name */

function searchAnAgencyByName(name) {
    for (const agency of carMarket.sellers) {
        if (name === agency.agencyName) {
            return agency;
        }
    }
    return `invalid`;
}


console.log("Searching for car agency by name: ");
console.log(searchAnAgencyByName("CarMax"));
console.log('xxxxxx');

/* Search for a car agency by its Id  */

function searchForCarAgencyById(Id) {
    for (const agency of carMarket.sellers) {
        if (Id === agency.agencyId) {
            return agency;
        }
    }
    return `invalid`;
}

console.log("Searching for car agency by id: "+searchForCarAgencyById("26_IPfHU1"));
console.log("xxxxxx");

/*Retrieve all agencies' names*/

function getAgenciesNames() {
    const agenciesArray= [];
    for (const agency of carMarket.sellers) {
        agenciesArray.push(agency.agencyName);
    }
    return agenciesArray;
}

console.log("Retrieving all agencies' names: "+getAgenciesNames());
console.log("xxxxxx");

/*Add a new car to an agency's inventory */

function addCarToInventory(agencyName, brand, car) {
    for (const agency of carMarket.sellers) {
        if (agencyName === agency.agencyName) {
            for (const temp of agency.cars) {
                if (brand == temp.brand) {
                    temp.models.push(car);
                    return `Car was added to Inventory`;
                }
            }
        }
    }
    return `invalid`;
}



const newCar = {
    name: "s80",
    year: 2013,
    price: 130000,
    carNumber: "2089732",
    ownerId: "######@",
};
console.log(addCarToInventory("CarMax", "Volvo", newCar));
console.log("xxxxxx");

/*Remove a car from an agency's inventory*/

function removeCarFromInventory(agencyName, carNum) {
    for (const agency of carMarket.sellers) {
        if (agencyName === agency.agencyName) {
            for (const temp of agency.cars) {
                const i = temp.models.findIndex(car => car.carNumber === carNum);
                if (i !== -1) {
                    temp.models.splice(i, 1);
                    return `Car removed from Inventory`;
                }
            }
        }
    }
    return `invalid!`;
}



console.log("Testing remove car from agency inventory: "+removeCarFromInventory("CarMax","4Ixb0"));
console.log("xxxxxx");

/*Change the cash of an agency*/

function changeCredit(agencyName, bucks) {
    for (const agency of carMarket.sellers) {
        if (agencyName === agency.agencyName) {
            agency.credit = bucks;
            return `Credit amount has been changed`;
        }
    }
    return `Invalid`;
}


console.log("Changing credit: ");
console.log(
    "credit before : ",
    searchAnAgencyByName("CarMax").credit
);
console.log(changeCredit("CarMax", 6565656));
console.log(
    "creditafter: ",
    searchAnAgencyByName("CarMax").credit
);
console.log("xxxxxx");


/*total agency revenue*/


carMarket.getTotalAgencyRevenue = function (agencyName) {
    let sum = 0;
    for (const agency of carMarket.sellers) {
        if (agencyName === agency.agencyName) {
            for (const temp of agency.cars) {
                for (let i = 0; i < temp.models.length; i++) {
                    sum += temp.models[i].price;
                }
            }
        }
    }
    return sum;
};

const id="Car Werks"
console.log(carMarket.getTotalAgencyRevenue(id))
console.log('xxxxxxx')

/* Customer Operations section */


/*get costumer by name or id*/
function getCustomerIdentifier(identifier){
   for (const temp of carMarket.customers){
    if(temp.name==identifier || temp.id==identifier){
        return temp;
    }
   } 
   return 'invalid';

}

let name='Aleksander Carr'
console.log(getCustomerIdentifier(name))
console.log('xxxxxx')

/* Get all customers */


function getCustomers() {
    const customerArray= [];
    for (const customer of carMarket.customers) {
        customerArray.push(customer.name);
    }
    return customerArray;

}

console.log("List of all customers: " +getCustomers())

console.log('xxxxxxx')


/* Change cash of customer */

function changeCash(customerName, bucks) {
    for (const temp of carMarket.customers) {
        if (customerName === temp.name) {
            temp.cash = bucks;
            return `Cash amount has been changed`;
        }
    }
    return `Invalid`;
}

// Test
console.log("Changing cash: ");
console.log(
    "customer cash before : ",
    getCustomerIdentifier("Aleksander Carr").cash
);
console.log(changeCash("Aleksander Carr", 5077));
console.log(
    "customer cash after: ",
    getCustomerIdentifier("Aleksander Carr").cash
);
console.log("xxxxxx");


/* Value of possisions */

carMarket.getCustomerTotalCarValue = function (cusName){
let cust=getCustomerIdentifier(cusName)
value=0
for(const temp of cust.cars){
    value+= temp.price
}
return value;
}

console.log(carMarket.getCustomerTotalCarValue('Aleksander Carr'))
console.log('xxxxx')


/* Car Operations */


/* Retrive all cars available for purchase */

function validForPurchase(){
    const carArray = [];
    for (const agency of carMarket.sellers) {
            for (const temp of agency.cars) {
                for (let i = 0; i < temp.models.length; i++) {
                    carArray.push(temp.models[i]);
                }
            }
        
    }
    return carArray;
}

console.log(validForPurchase())
console.log('xxxxxxxxx')

/* Specifics of cars */

function selectCar(year, price, brand) {
    const options = [];
    for (const type of carMarket.sellers) {
        for (const temp of type.cars) {
            if (temp.brand === brand) {
                for (let i = 0; i < temp.models.length; i++) {
                    if (temp.models[i].year === year && temp.models[i].price == price) 
                    {
                        options.push(temp.models[i]);
                    }
                }
            }
        }
    }
    if(options.length == 0){
        return `invalid`;
    }
    return options;
}

console.log(selectCar(2020, 336300,'toyota'))

console.log('xxxxxxxxx')

/*Most expensive car */

carMarket.getMostExpensiveCar = function ()
{
  const cars=validForPurchase();
  const highest=cars.reduce((max,temp)=> { return temp.price > max.price ? temp : max;})

  return highest;

}

console.log(carMarket.getMostExpensiveCar())
console.log('xxxxxxxxxx')

/*Least expensive car */

carMarket.getCheapestCar = function ()
{
  const cars=validForPurchase();
  const lowest=cars.reduce((min,temp)=> { return temp.price < min.price ? temp : min;})

  return lowest;

}

console.log(carMarket.getCheapestCar())
console.log('xxxxxxxxxx')

