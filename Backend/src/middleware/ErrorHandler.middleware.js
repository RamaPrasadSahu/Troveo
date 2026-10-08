const errorHandler = (err,req,res,next) =>{
    const statuscode = err.statuscode || 500
    const message = err.message || "Internal Server Error"

    return res(statuscode).json({
        success : false,
        statuscode,
        message,
        errors : err.errors || [],
    })
}

export {errorHandler}