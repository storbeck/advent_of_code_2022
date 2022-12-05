import { Calories } from "./Calories";

describe('testing provided scenario', () => {
  const calories = new Calories('../data/test_data.csv')
  
  test('first elf should have a total of 6000 calories', () => {
    expect(calories.total_calories_by_id(0)).toBe(6000)
  })

  test('the fourth elf should have the most calories', () => {
    const found_elf = calories.find_elf_with_most_calories()
    expect(found_elf.id).toBe(3) // 0 indexed
    expect(found_elf.total).toBe(24000)
  })

  test('the sum of calories by the three elves is 45000', () => {
    expect(calories.find_total_of_top_three_elves()).toBe(45000)
  })
})