function clone(obj) {
    if (obj == null || typeof (obj) != 'object')
        return obj;

    var temp = new obj.constructor();
    for (var key in obj)
        temp[key] = clone(obj[key]);

    return temp;
}

function expirationDate() {
    var expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 10);
    return expiration.getTime();
}
function isExpirated(user) {
    var expiration = new Date(user.timeStamp);
    var now = new Date();
    var expirated = false;
    if (now.getTime() > expiration.getTime()) {
        expirated = true;
    }
    return expirated;
}