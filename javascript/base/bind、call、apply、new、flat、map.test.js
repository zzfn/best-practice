import { myBind, myBind1, myApply, myCall, myNew, myInstanceof, myFlat, myMap } from './bind、call、apply、new、flat、map';
import { expect, test } from '@jest/globals';

test('myBind should bind function to context', () => {
    function greet() {
        return this.greeting;
    }
    const context = { greeting: 'Hello' };
    const boundGreet = greet.myBind(context);
    expect(boundGreet()).toBe('Hello');
});

test('myBind1 should bind function to context', () => {
    function greet() {
        return this.greeting;
    }
    const context = { greeting: 'Hello' };
    const boundGreet = greet.myBind1(context);
    expect(boundGreet()).toBe('Hello');
});

test('myApply should apply function with context and arguments', () => {
    function greet(name) {
        return `${this.greeting}, ${name}`;
    }
    const context = { greeting: 'Hello' };
    expect(greet.myApply(context, ['John'])).toBe('Hello, John');
});

test('myCall should call function with context and arguments', () => {
    function greet(name) {
        return `${this.greeting}, ${name}`;
    }
    const context = { greeting: 'Hello' };
    expect(greet.myCall(context, 'John')).toBe('Hello, John');
});

test('myNew should create new object instance', () => {
    function Person(name) {
        this.name = name;
    }
    const john = myNew(Person)('John');
    expect(john.name).toBe('John');
    expect(john).toBeInstanceOf(Person);
});

test('myInstanceof should correctly identify instance of a class', () => {
    function Person(name) {
        this.name = name;
    }
    const john = new Person('John');
    expect(myInstanceof(john, Person)).toBe(true);
});

test('myFlat should flatten array to specified depth', () => {
    const arr = [1, [2, [3, [4]]]];
    expect(arr.myFlat(2)).toEqual([1, 2, 3, [4]]);
});

test('myMap should map array elements using provided function', () => {
    const arr = [1, 2, 3];
    const square = x => x * x;
    expect(arr.myMap(square)).toEqual([1, 4, 9]);
});
