import { NextApiRequest, NextApiResponse } from "next";
import { validateJWT } from "../../../lib/auth";
import { db } from "../../../lib/dbConnection";

export default async function createInventory (req: NextApiRequest, res: NextApiResponse) {

    const user = await validateJWT(req.cookies[process.env.COOKIE_NAME]);

    await db.inventory.create({
        data:{
            title: req.body.title,
            description: req.body.description,
            inventoryProfilePictureURL: req.body.inventoryProfilePictureURL,
            ownerId: user.id,
        }
    })

    res.json({ message: "Inventory created succefully" });
}