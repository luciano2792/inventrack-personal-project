import { NextApiRequest, NextApiResponse } from "next";
import { validateJWT } from "../../../lib/auth";
import { db } from "../../../lib/dbConnection";

export default async function deleteInventory(req: NextApiRequest, res: NextApiResponse) {
    const user = await validateJWT(req.cookies[process.env.COOKIE_NAME]);

    await db.product.deleteMany({
        where: {
            inventoryId: req.body.id,
            AND: {
                ownerId: user.id
            }
        }
    })

    await db.inventory.delete({
        where:{
            id: req.body.id
        }
    })

    res.json({ message: "Inventory deleted succefully"})
}