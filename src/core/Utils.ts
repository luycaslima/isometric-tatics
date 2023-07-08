import { Point } from "pixi.js";
import { Vector3 } from "./Interfaces";

export function lerp(from: number, to: number, t: number): number{
    return from + t * (to - from)  ;
}

export function roundPosition(pos: Vector3) : Point {
  return new Point(Math.round((pos.x + Number.EPSILON) * 100) / 100 , Math.round((pos.y + Number.EPSILON) * 100) / 100);
}


//FIRST IN LAST OUT
export class Stack<T>  {
    private storage: T[] = [];
  
    constructor(private capacity: number = Infinity) {}
  
    public push(item: T): void {
      if (this.size() === this.capacity) {
        throw Error("Stack has reached max capacity, you cannot add more items");
      }
      this.storage.push(item);
    }
  
    public pop(): T | undefined {
      return this.storage.pop();
    }
  
    public peek(): T | undefined {
      return this.storage[this.size() - 1];
    }
  
    public size(): number {
      return this.storage.length;
    }

    public get isEmpty(): boolean {
        return this.storage.length === 0;
    }
}

//FIRST IN FIRST OUT
export class Queue<T>{
    
    public constructor(
        private elements: Record<number, T> = {},
        private head: number = 0,
        private tail: number = 0
    ) { }

    public enqueue(element: T): void {
        this.elements[this.tail] = element;
        this.tail++;
    }

    public dequeue(): T {
        const item = this.elements[this.head];
        delete this.elements[this.head];
        this.head++;

        return item;
    }

    public peek(): T {
        return this.elements[this.head];
    }

    public get length(): number {
        return this.tail - this.head;
    }

    public get isEmpty(): boolean {
        return this.length === 0;
    }

}