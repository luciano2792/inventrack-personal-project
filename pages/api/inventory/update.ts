import { NextApiRequest, NextApiResponse } from "next";
import { validateJWT } from "../../../lib/auth";
import { db } from "../../../lib/dbConnection";

export default async function updateInventory (req: NextApiRequest, res: NextApiResponse) {

    const user = await validateJWT(req.cookies[process.env.COOKIE_NAME]);

    if(!user.id){
        res.status(403)
        res.json({message: "unauthorized"})
    } else {
        await db.inventory.update({
            where: {
                id: req.body.id,
            },
            data: {
                title: req.body.title,
                description: req.body.description
            }
        });
    }
    
    res.json({ message: "Inventory updated succefully" });
}