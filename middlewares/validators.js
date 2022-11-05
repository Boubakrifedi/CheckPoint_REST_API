const {check, validationResult } = require  ("express-validator");


exports.uservalidator = [
    check("name").trim().notEmpty().withMessage("name is missing"),
];

exports.validate = (req,res,next) => {
    const error = validationResult(req).array();
    if(error.length) res.json({error: error[0].msg});
    next();
};
