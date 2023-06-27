import { GetRecipeRequestData, GetRecipeResponseData } from "@/types/recipe";
import type { NextApiRequest, NextApiResponse } from "next";

export default function recipe(
  req: NextApiRequest,
  res: NextApiResponse<GetRecipeResponseData>
) {
  const body = req.body as GetRecipeRequestData;

  const dummyRecipe = `${body.foods}を使ったレシピはこちらです。`;

  res.status(200).json({ recipe: dummyRecipe });
}