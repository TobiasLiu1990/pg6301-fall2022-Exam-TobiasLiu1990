import { Router } from "express";

/**
 * Path: /api/menu
 * Access: From server.js
 *
 */

export function MenuApi(mongoDatabase) {
  const menuRouter = new Router();

  menuRouter.get("/", async (req, res) => {
    const menu = await mongoDatabase
      .collection("menu")
      .find()
      .map(({ pizza, price, ingredients, allergens }) => ({
        pizza,
        price,
        ingredients,
        allergens,
      }))
      .toArray();

    return res.json(menu);
  });

  menuRouter.post("/new", (req, res) => {
    const { pizza, price, ingredients, allergens } = req.body;
    const result = mongoDatabase.collection("menu").insertOne({
      pizza,
      price,
      ingredients,
      allergens,
    });
    res.sendStatus(200);
  });

  return menuRouter;
}
