class LinkedList {
    constructor() {
        this.start = null;
    }

    append(node) {
        if (!this.start) {
            this.start = node;
            return this.start;
        }

        function endingNode(currentNode, newNode) {
            if (!currentNode.nextNode) {
                currentNode.nextNode = newNode;
                return;
            }
            return endingNode(currentNode.nextNode, newNode);
        }
        return endingNode(this.start, node);
    }

    prepend(node) {
        node.nextNode = this.start;
        this.start = node;
    }

    size() {
        if (!this.start) return 0;
        let counter = 1;

        function countUp(currentNode) {
            counter += 1;
            if (!currentNode.nextNode) {
                return counter;
            }

            return countUp(currentNode.nextNode);
        }
        return countUp(this.start);
    }

    head() {
        if (!this.start) return;
        return this.start;
    }

    tail() {
        if (!this.start) return;

        function lastElement(currentNode) {
            if (!currentNode.nextNode) {
                return currentNode;
            }

            return lastElement(currentNode.nextNode);
        }

        return lastElement(this.start);
    }

    at(index) {
        if (!this.start || typeof index !== 'number') return;
        index = Math.abs(index);

        if (index === 0) return this.start;

        function findIndex(index, node) {
            if (index === 0) return node;
            if (!node.nextNode) return null;

            return findIndex(index - 1, node.nextNode);
        }

        return findIndex(index - 1, this.start.nextNode);
    }

    pop() {
        if (!this.start) return;

        if (!this.start.nextNode) return (this.start = null);

        function lastElement(currentNode) {
            if (!currentNode.nextNode.nextNode) {
                currentNode.nextNode = null;
                return currentNode;
            }

            return lastElement(currentNode.nextNode);
        }

        return lastElement(this.start);
    }

    contains(value) {
        if (!this.start || !value) return;

        function findValue(currentNode, value) {
            if (!currentNode.nextNode) return false;

            if (currentNode.value === value) {
                return true;
            }

            return findValue(currentNode.nextNode, value);
        }

        return findValue(this.start, value);
    }

    find(value) {
        if (!this.start || !value) return;
        let index = 0;

        function findValue(currentNode, value) {
            if (!currentNode.nextNode) return null;

            if (currentNode.value === value) {
                return index;
            }

            index += 1;

            return findValue(currentNode.nextNode, value);
        }

        return findValue(this.start, value);
    }

    toString() {
        if (!this.start) return;
        return JSON.stringify(this.start);
    }

    insertAt(value, index) {
        if (!value) return null;
        index = Math.abs(index);

        if (!(value instanceof Node)) {
            value = new Node(value);
        }

        if (index === 0) {
            return this.start !== null
                ? this.prepend(value)
                : (this.start = value);
        }

        let counter = index;

        function placeValue(currentNode, value) {
            if (!currentNode || counter < 0) return null;

            if (counter === 0) {
                value.nextNode = currentNode;
                currentNode = value;
                return currentNode;
            }

            counter -= 1;
            currentNode.nextNode = placeValue(currentNode.nextNode, value);
            return currentNode;
        }

        return placeValue(this.start, value);
    }

    removeAt(index) {
        if (typeof index !== 'number' || !this.start) return;

        index = Math.abs(index);

        if (index === 0) {
            this.start = this.start.nextNode;
            return this.start;
        }

        let counter = index;
        function removeIndex(currentNode) {
            if (!currentNode || counter < 0) return null;

            if (counter === 0) {
                return currentNode.nextNode;
            }

            counter -= 1;
            currentNode.nextNode = removeIndex(currentNode.nextNode);
            return currentNode;
        }

        return removeIndex(this.start);
    }
}

class Node {
    constructor(value) {
        this.value = value;
        this.nextNode = null;
    }
}

let list = new LinkedList(),
    myNode = new Node(42),
    myNod = new Node(3);

list.append(myNode);
list.append(myNod);
list.append(new Node(34));
list.prepend(new Node(50));

console.log(list);
console.log(list.removeAt(0));
console.log(list.toString());
