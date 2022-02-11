function myInstanceof(child, parent) {
    let proto = Object.getPrototypeOf(child);
    let prototype = parent.prototype
    while (proto) {
        if (proto === prototype) {
            return true;
        }
        proto = Object.getPrototypeOf(proto);
    }
    return false;
}
