import { v4 as uuidv4 } from 'uuid';




//Vehicle class Start
class Vehicle {
    private _id: string;
    private _name: string;
    private _price: number;
    private _description: string;

    constructor(name: string, price: number, description: string) {
        this._id = uuidv4();
        this._name = name;
        this._price = price;
        this._description = description;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }
}
//Vehicle class end

//User class start
class User {
    private _id: string;
    private _name: string;
    private _age: number;
    private _cart: Vehicle[];

    constructor(name: string, age: number) {
        this._id = uuidv4();
        this._name = name;
        this._age = age;
        this._cart = [];
    }

    static createUser(): User | null {
        const nameInput = <HTMLInputElement>document.getElementById("name");
        const ageInput = <HTMLInputElement>document.getElementById("age");
        const name = nameInput.value.trim();
        const age = parseInt(ageInput.value);

        if (name && age) {
            return new User(name, age);
        } else {
            return null;
        }
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get age(): number {
        return this._age;
    }

    set age(value: number) {
        this._age = value;
    }

    get cart(): Vehicle[] {
        return this._cart;
    }

    set cart(value: Vehicle[]) {
        this._cart = value;
    }

    addToCart(item: Vehicle): void {
        this._cart.push(item);
    }

    removeFromCart(itemId: string): void {
        this._cart = this._cart.filter(item => item.id !== itemId);
    }

    removeQuantityFromCart(itemId: string, quantity: number): void {
        let itemsToRemove = quantity;
        this._cart = this._cart.filter(item => {
            if (item.id === itemId && itemsToRemove > 0) {
                itemsToRemove--;
                return false;
            }
            return true;
        });
    }

    cartTotal(): number {
        return this._cart.reduce((total, item) => total + item.price, 0);
    }

    printCart(): void {
        console.log(this._cart);
    }
}
//User class end

//Shop class start
class Shop {
    private _items: Vehicle[];

    constructor() {
        this._items = [
            new Vehicle('Tesla Model S', 79000, 'Electric car'),
            new Vehicle('Mazda CX-5', 25000, 'SUV'),
            new Vehicle('Toyota Camry', 24000, 'Sedan')
        ];
    }

    get items(): Vehicle[] {
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