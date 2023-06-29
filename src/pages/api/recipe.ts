import { GetRecipeRequestData, GetRecipeResponseData } from "@/types/recipe";
import { error } from "console";
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
          content: "以下の人物を全て含めて物語を180字で作ってください。",
        },
        {
          role: ChatCompletionRequestMessageRoleEnum.User,
          content: `${body.foods}`,
        },
      ],
    })

    .catch((error) => {
      res.status(500).send(error);
    });

  const result = response.data.choices[0];

  res.status(200).json({ recipe: result });

  //   .catch((error) => {
  //     console.error(error);
  //     return null;
  //   });
  // if (!response) {
  //   res.status(500).end("error");
  //   return;
  // }

  // const result = response.data.choices[0];

  // res.status(200).json({ recipe: result.message!.content });
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
