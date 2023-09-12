import * as Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
const LogoutSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "dev"] },
    })
    .message("Please enter valid Email")

    ,
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9@#]{3,30}$"))
    .message("Please enter valid Password")
});

export const LogoutResolver = joiResolver(LogoutSchema);
