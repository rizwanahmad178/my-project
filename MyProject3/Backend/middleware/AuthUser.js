import User from "../models/UserModel.js";
import Roles from "../models/RoleModel.js";

export const verifyUser = async (req, res, next) =>{
    if(!req.session.userId){
        return res.status(401).json({msg: "Please log in to your account!"});
    }
    const user = await User.findOne({
        attributes:['uuid','name','email','roleId','id'],
        include:[{
            model:Roles,
            attributes:['roleName','id']
        }],
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User not found"});
    
    req.userId = user.id;
    req.roleId = user.roleId; 
    next();
}


export const adminOnly = async (req, res, next) =>{
    const user = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if(!user) return res.status(404).json({msg: "User not found"});
    if(user.roleId !== 1) return res.status(403).json({msg: "Access prohibited"});
    next();
}

export const verifyRoles = (...allowedRoles) => {
    return async (req, res, next) => {
        // Your existing logic to verify user authentication
        if (!req.session.userId) {
            return res.status(401).json({ msg: "Please log in to your account!" });
        }
        const user = await User.findOne({
            attributes:['uuid','name','email','roleId','id'],
            include:[{
                model:Roles,
                attributes:['roleName','id']
            }],
            where: {
                uuid: req.session.userId
            }
        });
        if (!user) return res.status(404).json({ msg: "User not found" });
        req.userId = user.id;
        req.roleId = user.roleId;

        // Check if user's role matches any allowed role
        const userRole = user.role.roleName; // Get user's role

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ msg: "Access prohibited" }); // User's role doesn't match any allowed role
        }

        next(); 
    };
};
