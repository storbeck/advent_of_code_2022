import { Calories } from "./Calories";
import { IElf } from "./types";

const calories = new Calories('../data/input.csv')

const pprint = (elf: IElf) => {
  console.log(
    `[elf] id: %d, total: %d, items: [${elf.itemized.join(', ')}]`, 
    elf.id,
    elf.total
  )
}

const elves = calories.find_top_three_elves_with_most_calories()
elves.forEach(pprint)

console.log(
  calories.find_total_of_top_three_elves()
)