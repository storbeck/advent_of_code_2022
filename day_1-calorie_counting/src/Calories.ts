import fs from 'fs'
import path from 'path'
import { IElf } from './types'

export class Calories {
  filename: string|undefined = undefined;
  constructor(filename: string) {
    this.filename = filename;
  }

  read() {
    if (this.filename === undefined) {
      throw new Error('Filename is missing')
    }
    
    try {
      return fs.readFileSync(path.resolve(__dirname, `../data/${this.filename}`), 'utf8')
    } catch (err) {
      throw err;
    }
  }

  summarize = (inputData: string): IElf[] => {
    const elves: IElf[] = [];
    let elf_in_progress: IElf = {
      id: 0,
      itemized: [],
      total: 0
    }
  
    inputData.split('\n').forEach((caloriesStr: string) => {
      // new elf break
      if (caloriesStr === '') {
        elves.push(elf_in_progress)
        elf_in_progress = {
          id: elf_in_progress.id + 1,
          itemized: [],
          total: 0
        }
      } else {
        const calories = Number(caloriesStr)
        elf_in_progress.itemized.push(calories)
        elf_in_progress.total += calories;
      }
    })

    return [...elves, elf_in_progress];
  }

  calculate = () => (
    this.summarize(
      this.read()
    )
  )

  total_calories_by_id = (id: number): number => {
    return this.calculate()[id].total
  }

  find_elf_with_most_calories = (): IElf => (
    this.calculate().reduce((previousElf: IElf, currentElf: IElf) => 
      (previousElf.total > currentElf.total) 
        ? previousElf
        : currentElf
    )
  )

  find_top_three_elves_with_most_calories = (): IElf[] => {
    const elves = this.calculate()
    elves.sort((elf_a, elf_b) => {
      if (elf_a.total > elf_b.total) return -1
      if (elf_b.total > elf_a.total) return 1
      return 0;
    })
    return elves.slice(0, 3)
  }

  find_total_of_top_three_elves = (): number => {
    const elves = this.find_top_three_elves_with_most_calories()
    return elves[0].total + elves[1].total + elves[2].total
  }
}