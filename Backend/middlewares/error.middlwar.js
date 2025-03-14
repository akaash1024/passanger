const errorMiddleware = (err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "BACKEND ERROR"
    const extraDetails = err.extraDetails || "BACKEND ERROR"

    res.status(500).json({
        status,
        message,
        extraDetails,
        success: false
    })
}


module.exports = errorMiddleware;