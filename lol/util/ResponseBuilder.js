var ResponseBuilder = {
    data: {},
    status: function(status) {
        this.data.status = status;
        return this;
    },
    entity: function(data) {
        this.data.data = data;
        return this;
    },
    end: function(res) {
        res.send(this.data);
    }
}

module.exports = ResponseBuilder;
