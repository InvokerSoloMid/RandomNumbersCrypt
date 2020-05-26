export class Tree {
  constructor() { }
  // root = new Node();

  // sayHi() {
  //   console.log('hello I`m tree!');
  // }

  // addNode(node, father = this.root) {
  //   if (!father.left) {
  //     node.id = father.id ? father.id + '0' : '0';
  //     father.left = node;
  //   } else {
  //     node.id = father.id ? father.id + '1' : '1';
  //     father.right = node;
  //   }
  // }

}

export class Node {
  constructor(left, right, parent) {
    this.left = left;
    this.right = right;
    this.parent = parent;
    console.log('this.left::', this.left);
    this.value = this.setValue(left, right);
  }

  left: null;
  right: null;
  parent: null;
  id: null;
  value: null;


  setValue(left, right) {
    console.log('setValue left::', left);
    const leftValue = left.value ? left.value : left;
    const rightValue = right.value ? right.value : right;
    return leftValue + rightValue;
  }
}
