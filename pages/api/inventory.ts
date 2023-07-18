import { NextApiRequest, NextApiResponse } from "next";
import { validateJWT } from "../../lib/auth";
import { db } from "../../lib/dbConnection";

export async function createInventory (req: NextApiRequest, res: NextApiResponse) {

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

export async function updateInventory (req: NextApiRequest, res: NextApiResponse) {

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

export async function getManyInventories(req: NextApiRequest, res: NextApiResponse) {
    const user = await validateJWT(req.cookies[process.env.COOKIE_NAME]);

    const inventories =  await db.inventory.findMany({
        where: {
            id: req.body.id,
            AND: {
                ownerId: user.id
            }
        }
    })

    res.json(inventories)
}

export async function getInventory(req: NextApiRequest, res: NextApiResponse) {
    const user = await validateJWT(req.cookies[process.env.COOKIE_NAME]);

    const inventory =  await db.inventory.findFirst({
        where: {
            id: req.body.id,
            AND: {
                ownerId: user.id
            }
        }
    })

    res.json(inventory)
}

export async function deleteInventory(req: NextApiRequest, res: NextApiResponse) {
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