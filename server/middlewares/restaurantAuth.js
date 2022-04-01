const  {isLoggedInValidated, isOwner } = require("./basicCheckers");


module.exports.restaurantAuth = async (req, res, next) => {
	isLoggedInValidated(req,res,next); //! Check if user is logged in and validated
	isOwner(req,res,next);

	return next();
};
