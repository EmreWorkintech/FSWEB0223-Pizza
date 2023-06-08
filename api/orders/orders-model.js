const db = require('../../data/db-config');
const { formatResponse } = require('../../helpers/helpers');

async function getById(id) {
    const data = await db('Orders as o')
                    .leftJoin('Order_Pizzas as op', 'o.id', 'op.order_id')
                    .leftJoin('Order_Pizza_Toppings as opt', 'op.id', 'opt.order_pizza_id')
                    .leftJoin('Toppings as t', 't.id', "opt.topping_id")
                    .where('o.id', id)
                    .select('o.id',
                            'o.totalPrice',
                            'o.note',
                            'o.status',
                            'op.count',
                            'op.size',
                            'op.dough',
                            'op.pizza_id',
                            't.id as topping_id',
                            't.name as topping_name',
                            );
    return formatResponse(data);
}

async function create(payload) {
    /* const payload =  {
            "order": {
                "totalPrice": 125.5,
                "note": "lkjlkjj"
            },
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
            }
    */
   let order_id;
    await db.transaction( async trx=> {
        /* yapılacaklar:        
                Transaction kullanmak lazım: 3 ayrı tabloya yazıyoruz.

                1- order'ı orders tablosuna ekle ve id'sini al.
                2- pizzas içindeki her bir pizza için döngü yap
                    -pizza'yı order-pizzas taablosuna ekle ve id'sini al.
                    - her pizza'nın topping'i için döngü yap
                        -her topping'i order-pizza-toppings tablosuna ekle
        */
            const order = payload.order;


            [order_id] = await trx('Orders').insert({
                status: "Sipariş alındı",
                note: order.note,
                totalPrice: order.totalPrice,
                user_id: order.user_id
            });

            const pizzas = payload.pizzas;

            for(let i = 0; i < pizzas.length; i++) {
                const newPizza = {
                    count: pizzas[i].count,
                    size: pizzas[i].size,
                    dough: pizzas[i].dough,
                    pizza_id: pizzas[i].pizza_id,
                    count: pizzas[i].count,
                    order_id: order_id
                }

                const [order_pizza_id] = await trx('Order_Pizzas').insert(newPizza);

                const toppings = pizzas[i].toppings;
                if(toppings.length>0) {
                    const newToppings = toppings.map(item=>{
                        const newTopping = {
                            topping_id: item,  //1
                            order_pizza_id: order_pizza_id  
                        }
                        return newTopping
                    })
                    await trx('Order_Pizza_Toppings').insert(newToppings);
                }

            }

            
    })
    const recordedOrder = await getById(order_id);
    return recordedOrder;
}

function update(id, payload) {

    /* yapılacaklar:        
            Transaction kullanmak lazım: 3 ayrı tabloya yazıyoruz.
            
            1- order'ın pizza'larını silicem.
            2- order'ı update edeceğim.
            2- pizzas içindeki her bir pizza için döngü yap
                -pizza'yı order-pizzas taablosuna ekle ve id'sini al.
                - her pizza'nın topping'i için döngü yap
                    -her topping'i order-pizza-toppings tablosuna ekle
    */


}

module.exports = {
    create,
    getById,
    update,
}