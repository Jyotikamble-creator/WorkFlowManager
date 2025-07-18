module.exports=function(...allowedRoles) {
    return (req, res, next) => {
        const userRole = req.user?.role;

        if(!allowedRoles.includes(userRole)) {
            return res.status(401).json({ message: "Unauthorized" });
        }
    }

    // allow only role is valid 
    next();
}