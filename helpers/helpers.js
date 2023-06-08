function formatResponse(data) {
    let result = data.reduce((acc,order)=>{
       /*  {
            "id": 1,
            "totalPrice": 125.5,
            "note": "lkjlkjj",
            
            "pizzas": [
                {
                "count": 1
                "size": "Büyük",
                "dough": "Kalın",
                "pizza_id": 1,
                "toppings": [
                    1,
                    3,
                    4,
                    5
                ]
                },
                {
                "count": 1
                "size": "Büyük",
                "dough": "Kalın",
                "pizza_id": 1,
                "toppings": [
                    1,
                    3,
                    4,
                    5
                ]
                }
            ]
            } */

        const recordedOrder = acc.find(item=>item.id == order.id);

        const topping = {
            id: order.topping_id,
            name: order.topping_name
         }
        delete order.topping_id;
        delete order.topping_name;

        const pizza = {
            count: order.count,
            size: order.size,
            dough: order.dough,
            pizza_id: order.pizza_id,
            toppings: []
        }
        delete order.count;
        delete order.size;
        delete order.dough;
        delete order.pizza_id;

        if(!recordedOrder) {

            if(topping.id == null) {
                // case 1 yeni bir geldi ama topping yok
                order.pizzas = [pizza];
                
            } else {
                 // yeni bir order geldi topping var
                 pizza.toppings = [topping]
                 order.pizzas = [pizza];
            }
            acc.push(order);
        } else {


            // eski order 
            const recordedPizza = recordedOrder.pizzas.find(item=>item.pizza_id == pizza.pizza_id);

            if(!recordedPizza) {
                 //yeni bir pizza toppinng yok
                // yeni bir pizza topping var

                if(topping.id == null) {
                    // case 1 yeni bir geldi ama topping yok
                    recordedOrder.pizzas.push(pizza);
                    
                } else {
                     // yeni bir order geldi topping var
                     pizza.toppings = [topping]
                     recordedOrder.pizzas.push(pizza);
                }

            } else {
                recordedPizza.toppings.push(topping)
                  // eski pizza topping var.

            }
        
        }
        return acc;
    }, [])
    return result;
}

module.exports = {
    formatResponse,
}