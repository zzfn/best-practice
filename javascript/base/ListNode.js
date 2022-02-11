var MyLinkedList = function() {
    this.head = null;
    this.tail = null;
    this.length = 0;
};

MyLinkedList.prototype.node = function(val) {
    this.val = val;
    this.next = null;
    return this;
};
/**
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function(index) {
    if (index < 0 || index >= this.length) {
        return -1;
    }
    let current = this.head;
    for (let i = 0; i < index; i++) {
        current = current.next;
    }
    return current.val;
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(val) {
    const node = new this.node(val);
    if(!this.head){
        this.head = node;
        this.tail = node;
    }else {
        node.next = this.head;
        this.head = node;
    }
    if(!this.tail){
        this.tail = node;
    }
    this.length++;
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function(val) {
    const node = new this.node(val);
    if (this.tail) {
        this.tail.next = node;
    }
    this.tail = node;
    if (!this.head) {
        this.head = node;
        this.head.next = null;
    }
    this.length++;
};

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {
    if (index === this.length) {
        this.addAtTail(val);
    } else if (index <= 0) {
        this.addAtHead(val);
    } else if (index > 0 && index < this.length) {
        const node = new this.node(val);
        let current = this.head;
        for (let i = 0; i < index - 1; i++) {
            current = current.next;
        }
        node.next = current.next;
        current.next = node;
        this.length++;
        console.log(this);
    }
};

/**
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function(index) {
    if (index > 0 && index < this.length) {
        let i = 0;
        let prev = null;
        let cur = this.head;
        while (i < index) {
            prev = cur;
            cur = cur.next;
            i++;
        }
        prev.next = cur.next;
        if (index === this.length - 1) {
            this.tail = prev;
        }
        this.length--;
    } else if (index === 0) {
        this.head = this.head.next;
        this.length--;
    }
};
