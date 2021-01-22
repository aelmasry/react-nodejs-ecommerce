const { check, validationResult } = require("express-validator");

const signUpValidation = () => {
    return [
        check("name")
            .isLength({ min: 3 })
            .withMessage("the name must have minimum length of 3")
            .trim(),
      
        check("email")
          .isEmail()
          .withMessage("invalid email address")
          .normalizeEmail(),
      
        check("password")
          .isLength({ min: 8, max: 15 })
          .withMessage("your password should have min and max length between 8-15")
        //   .matches(/\d/)
        //   .withMessage("your password should have at least one number")
        //   .matches(/[!@#$%^&*(),.?":{}|<>]/)
        //   .withMessage("your password should have at least one sepcial character")
    ]
}

const validate = (req, res, next) => {

    const errors = validationResult(req).formatWith(({ msg }) => msg);

    if (errors.isEmpty()) {
      return next()
    }

    return res.status(422).json({ errors: errors.array() })
  }
  
module.exports = {
    signUpValidation,
    validate
  }