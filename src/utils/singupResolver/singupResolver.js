import * as Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
const signupSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "dev"] },
    })
    .error((errors) => {
      errors.forEach((err) => {
        if (err.code === "string.empty") {
          err.message = "This field is required";
        }
      });
      return errors;
    }),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9@#]{3,30}$"))
    .error((errors) => {
      console.log(errors);
      errors.forEach((err) => {
        if (err.code === "string.empty") {
          err.message = "This field is required";
        } else if (err.code === "string.pattern.base") {
          err.message = "password must be character, number";
        }
      });
      return errors;
    }),
  confirm_password: Joi.string()
    .required()
    .valid(Joi.ref("password"))
    .error((errors) => {
      errors.forEach((err) => {
        if (err.code === "string.empty") {
          err.message = "This field is required";
        } else if (err.code === "any.only") {
          err.message = "password must be match";
        }
      });
      return errors;
    }),
});

export const signupResolver = joiResolver(signupSchema);
