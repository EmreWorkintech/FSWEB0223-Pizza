const db = require('../../data/db-config');


function create(payload) {
    /* const payload =  {
            "order": {
                "totalPrice": 125.5,
                "note": "lkjlkjj"
            },
            "pizzas": [
                {
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
    /* yapılacaklar:        
            Transaction kullanmak lazım: 3 ayrı tabloya yazıyoruz.

            1- order'ı orders tablosuna ekle ve id'sini al.
            2- pizzas içindeki her bir pizza için döngü yap
                -pizza'yı order-pizzas taablosuna ekle ve id'sini al.
                - her pizza'nın topping'i için döngü yap
                    -her topping'i order-pizza-toppings tablosuna ekle
    */


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
}