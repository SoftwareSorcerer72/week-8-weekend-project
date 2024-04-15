"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
//Vehicle class Start
class Vehicle {
    constructor(name, price, description) {
        this._id = (0, uuid_1.v4)();
        this._name = name;
        this._price = price;
        this._description = description;
    }
    itemElement() {
        const itemDiv = document.createElement("div");
        itemDiv.className = "item";
        itemDiv.innerHTML = `
            <h3>${this._name}</h3>
            <p>${this._description}</p>
            <p>Price: $${this._price.toFixed(2)}</p>
            <button onclick="Shop.addItemToCart('${this._id}')">Add to Cart</button>
        `;
        return itemDiv;
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get price() {
        return this._price;
    }
    set price(value) {
        this._price = value;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
}
//Vehicle class end
//User class start
class User {
    constructor(name, age) {
        this._id = (0, uuid_1.v4)();
        this._name = name;
        this._age = age;
        this._cart = [];
    }
    static createUser() {
        const nameInput = document.getElementById("name");
        const ageInput = document.getElementById("age");
        const name = nameInput.value.trim();
        const age = parseInt(ageInput.value);
        if (name && age) {
            return new User(name, age);
        }
        else {
            return null;
        }
    }
    get id() {
        return this._id;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get age() {
        return this._age;
    }
    set age(value) {
        this._age = value;
    }
    get cart() {
        return this._cart;
    }
    set cart(value) {
        this._cart = value;
    }
    addToCart(item) {
        this._cart.push(item);
    }
    removeFromCart(itemId) {
        this._cart = this._cart.filter(item => item.id !== itemId);
    }
    removeQuantityFromCart(itemId, quantity) {
        let itemsToRemove = quantity;
        this._cart = this._cart.filter(item => {
            if (item.id === itemId && itemsToRemove > 0) {
                itemsToRemove--;
                return false;
            }
            return true;
        });
    }
    cartTotal() {
        return this._cart.reduce((total, item) => total + item.price, 0);
    }
    printCart() {
        console.log(this._cart);
    }
}
//User class end
//Shop class start
class Shop {
    constructor() {
        this._items = [
            new Vehicle('Tesla Model S', 79000, 'Electric car'),
            new Vehicle('Mazda CX-5', 25000, 'SUV'),
            new Vehicle('Toyota Camry', 24000, 'Sedan')
        ];
    }
    get items() {
        return this._items;
    }
}
//Shop class end
let shop = new Shop();
// Create a User
let user = new User("Mike Welborn", 33);
// Add items from the shop to the user's cart
let shopItems = shop.items;
user.addToCart(shopItems[0]);
user.addToCart(shopItems[1]);
user.addToCart(shopItems[2]);
// Print the cart
user.printCart();
// Remove all of a singular item from the cart
user.removeFromCart(shopItems[0].id);
// Print the cart to verify the item was removed
user.printCart();
// Add 5 of an item to the cart
for (let i = 0; i < 5; i++) {
    user.addToCart(shopItems[1]);
}
// Print the cart 
user.printCart();
// Remove a quantity from the cart
user.removeQuantityFromCart(shopItems[1].id, 3);
// Print the cart to verify the items were removed
user.printCart();
// Calculate the total price of the items in the cart
let total = user.cartTotal();
console.log(`Total: $${total}`);
