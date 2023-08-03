const fs = require('fs');

class Inventory {
    constructor() {
        this.stack = [];
    }

    push(calories) {
        this.stack.push(calories);
    }

    sumCalories() {
        return this.stack.reduce((accumulator, calories) => accumulator + calories, 0);
    }
}

class Expedition {
    constructor(filename) {
        this.elfInventoryList = [];
        this.readInput(filename);
    }

    readInput(filename) {
        const input = fs.readFileSync(filename, 'utf8');
        const lines = input.split('\n');

        let tempInventory = null;

        for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine === '') {
                if (tempInventory) {
                    this.elfInventoryList.push(tempInventory);
                    tempInventory = null;
                }
            } else {
                const calories = parseInt(trimmedLine, 10);
                if (!tempInventory) {
                    tempInventory = new Inventory();
                }
                tempInventory.push(calories);
            }
        }

        if (tempInventory) {
            this.elfInventoryList.push(tempInventory);
        }
    }

    elfWithMaximumCalories() {
        let maxCalories = 0;
        let maxElfsCalories = null;

        for (const inventoryList of this.elfInventoryList) {
            const sumCalories = inventoryList.sumCalories();
            if (sumCalories > maxCalories) {
                maxCalories = sumCalories;
                maxElfsCalories = inventoryList;
            }
        }

        return maxElfsCalories;
    }
}

const expedition = new Expedition('input_01.txt');
const maxCalories = expedition.elfWithMaximumCalories();

console.log('Maximum Calories carried by the Elf: ', maxCalories.sumCalories());