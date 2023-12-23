export default {
	jwt_secret: process.env.JWT_SECRET,
	jwt_expiresIn: '15m',
	refreshJWT_secret: process.env.REFRESH_JWT_SECRET,
	refreshJWT_expiresIn: '30d',
	refreshJWT_expiresDays: 30,
};
