module.exports = {
    returnJsonError: function (res, status, msg) {
        let data = {
            message: msg,
            status: status,
        }
        return res.status(status).json(data);
    }
}