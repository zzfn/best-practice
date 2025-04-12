type Partial<T> = {
    [P in keyof T]?: T[P];
};
class Book {
    name: string;
    value: boolean;
}
type PartialBool = Partial<Book>;

let partialBook1: PartialBool
partialBook1 = {name: "book1"};
let partialBook2 = new Book();
partialBook2.name = "book1";
partialBook2.value = true;
