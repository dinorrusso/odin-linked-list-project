//linked-list.js

class Node {

  constructor(value){
    this.value = value;
    this.nextNode = null;
  }
  print(){
    console.log(`(${this.value})`);
    return;
  }
}

class LinkedList {
  #head;
  #size;
  constructor(){
    this.#head = null;
    this.#size = 0;
  }
 
append(value){
  //adds a new node containing value to the end of the list
    const node = new Node(value);
    if(this.#size === 0){
      this.#head = node;
    } else {
        let currentNode = this.#head;
        while (currentNode.nextNode !== null){
          currentNode = currentNode.nextNode;
        }
        currentNode.nextNode = node;
    }
    this.#size++;
    return;
  }
  prepend(value) {
    //adds a new node containing value to the start of the list
    const node = new Node(value);
    node.nextNode = this.#head;
    this.#head = node;
    this.#size++;
    return;
  }
   size(){
    //returns the total number of nodes in the list
    return this.#size;
  }
  head(){
    //returns the first node in the list or null
    return this.#head;
  }
  tail() {
  //returns the last node in the list or null
     if (this.#size === 0){
      return this.#head;
    }else {
      let t = this.#head;
      let currentNode = this.#head;
      while(currentNode){
        t = currentNode;
        currentNode = currentNode.nextNode;
      }
      return t;
    }
  }
  at(index){
    //returns the nth node index goes from 1..size or null on error
    if (index < 1 || index > this.#size){
      console.error('index out of range');
      return null;
    }else{
      let indexNode = this.#head;
      for (let i = 2; i <= index; i++){
        if(indexNode.nextNode){
          indexNode = indexNode.nextNode;
        }
      }
      return indexNode;
    }
  }
  pop(){
  //removes the last element from the list
  let popped;
  if(this.#size === 0){
    popped = null;
    console.error('cannot pop() an empty list');
  }
  if(this.#size === 1){
    //simple case - remove head
    popped = this.#head;
    this.#head = null;
  } else if (this.#size === 2){
    // simple case only leave head
    popped = this.#head.nextNode;
    this.#head.nextNode = null;
  } else {
    //find last
    popped = this.tail(); 
    let thisNode = this.#head;
    let saved;
    while(thisNode.nextNode !== null){
      saved = thisNode;
      thisNode = thisNode.nextNode;
    }
    //set the saved node's next to null
    saved.nextNode = null;
  }
  this.#size--;
  return popped;
  }
  contains(value){
    //returns true if the passed in value is in the list and otherwise returns false.
    let found = false;
      if (this.#size === 0){
      return found;
    }else {
      let currentNode = this.#head;
      while(currentNode){
        if(currentNode.value === value){
        return true;
        }
        currentNode = currentNode.nextNode;
      }
      return found;
    }
  }
  find(value){
    //returns the index of the node containing value, or null if not found.
    if (this.#size === 0){
      return null;
    }else {
      let currentNode = this.#head;
      let index = 1;
      while(currentNode){
        if(currentNode.value === value){
        return index;
        }
        currentNode = currentNode.nextNode;
        index++;
      }
      return null;
    }

  }
  toString(){
  //format should be: ( value ) -> ( value ) -> ( value ) -> null
   let listContent = '';
    if (this.#size === 0){
      console.log('the list is empty');
    }else {
      let currentNode = this.#head;
      while(currentNode){
        listContent += `( ${currentNode.value} ) -> `
        currentNode = currentNode.nextNode;
      }
    }
    listContent+= 'null'
    return listContent;
}
  print() {
    console.log(this.toString());
    return;
  }
  //extra credit
  insertAt(value, index){
    //inserts a new node with the provided value at the given index.
    if (index < 1 || index > this.#size){
      console.error('index out of range');
      return null;
    }else if (index === 1) {
      //simple case of prepend
      this.prepend(value);
      return;
    }else if (index === this.size()){
      //simple case of append
      this.append(value);
      return;
    }else {
      let previous = this.#head;
      let current = this.#head.nextNode;
      let next = current.nextNode;
      let currentIndex = 2;
      while(currentIndex < index ){
        currentIndex++
        previous = current;
        current = next;
        next = current.nextNode;
      }
      //current index === index so insert
      const newNode = new Node(value);
      newNode.nextNode = current;
      previous.nextNode = newNode;
      this.#size++;
      return;
    }
  }
  removeAt(index){
    // removes the node at the given index
    if (index === 1){
      //simple case removing head
      this.#head = null;
    }else{
      let previous = this.#head;
      let current = this.#head.nextNode;
      let next = current.nextNode;
      let currentIndex = 2;
      while(currentIndex < index ){
        currentIndex++
        previous = current;
        current = next;
        next = current.nextNode;
      }
      //current index === index so remove
      previous.nextNode = next;
      this.#size--;
      return;
    }
    
  }
}

//////////////////////////////////////////////
const testList = new LinkedList();
testList.append(1);
console.log('after append(1)');
testList.print();
console.log('size:', testList.size());
testList.append(2);
console.log('after append(2)');
testList.print();
console.log('size:', testList.size());
testList.prepend(3);
console.log('after prepend(3)');
testList.print();
console.log('size:', testList.size());
let tail = testList.tail();
console.log('testList.tail');
tail.print()
console.log('testing at()');
let testNode = testList.at(2);
console.log('testing at(2)');
testNode.print();
testNode = testList.at(3);
console.log('testing at(3)');
testNode.print();
testNode = testList.at(1);
console.log('testing at(1)');
testNode.print();
console.log('appending 99 for pop test');
testList.append(99);
testList.print();
const popped = testList.pop();
console.log('popped: '); 
popped.print();
console.log('resulting list: ');
testList.print();


///////////////////////////////////
//supplied test
const list = new LinkedList();

list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");
console.log(list.toString());
console.log('parrot is at index: ', list.find('parrot'));
console.log('fred is at index: ', list.find('fred'));
console.log('parrot is in list: ', list.contains('parrot'));
console.log('fred is in list: ', list.contains('fred'));

list.insertAt('not a parrot', 3);
list.insertAt('not a dog', 1);
list.insertAt('not a turtle', 7);
console.log(list.toString());
list.removeAt(4);
console.log(list.toString());