import Roles from "../models/RoleModel.js";
// import argon2 from "argon2";

export const getRoles = async(req, res) =>{
    try {
        const response = await Roles.findAll({
             attributes:['roleName','id']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


export const createRoles = async(req, res) =>{
    const {roleName} = req.body;

    try {
        await Roles.create({
            roleName: roleName,
        });
        res.status(201).json({msg: "Roles created"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

