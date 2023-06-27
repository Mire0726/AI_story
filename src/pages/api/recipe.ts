import { GetRecipeRequestData, GetRecipeResponseData } from "@/types/recipe";
import type { NextApiRequest, NextApiResponse } from "next";
import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai";

export default async function recipe( // 追加: asyncキーワード
  req: NextApiRequest,
  res: NextApiResponse<GetRecipeResponseData>
) {
  const body = req.body as GetRecipeRequestData;

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const response = await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: ChatCompletionRequestMessageRoleEnum.System,
          content:
            "以下の食材を全て含めて作ることができる料理のレシピを教えて下さい。",
        },
        {
          role: ChatCompletionRequestMessageRoleEnum.User,
          content: "玉ねぎ",
        },
      ],
    })
    .catch((error) => {
      console.error(error);
      return null;
    });

  if (!response) {
    res.status(500).end("Error occured");
    return;
  }

  const result = response.data.choices[0];

  res.status(200).json({ recipe: result });
}

// import { GetRecipeRequestData, GetRecipeResponseData } from "@/types/recipe";
// import type { NextApiRequest, NextApiResponse } from "next";

// export default function recipe(
//   req: NextApiRequest,
//   res: NextApiResponse<GetRecipeResponseData>
// ) {
//   const body = req.body as GetRecipeRequestData;

//   const dummyRecipe = `${body.foods}を使ったレシピはこちらです。`;

//   res.status(200).json({ recipe: dummyRecipe });
// }
// import {
//   ChatCompletionRequestMessageRoleEnum,
//   Configuration,
//   OpenAIApi,
// } from "openai";

// const body = req.body as GetRecipeRequestData;

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);
// const response = await openai
//   .createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [
//       {
//         role: ChatCompletionRequestMessageRoleEnum.System,
//         content:
//           "以下の食材を全て含めて作ることができる料理のレシピを教えて下さい。",
//       },
//       {
//         role: ChatCompletionRequestMessageRoleEnum.User,
//         content: body.foods,
//       },
//     ],
//   })
//   .catch((error) => {
//     console.error(error);
//     return null;
//   });
// if (!response) {
//   res.status(500).end("Error occured");
//   return;
// }

// const result = response.data.choices[0];

// res.status(200).json({ recipe: result.message!.content });
