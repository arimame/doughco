module.exports = {
    status: 0,
    time: 20,
    update: function(status, time) {
        this.status = status;
        this.time = time || this.time;
    }
}