const User = require('../models/User');

const verifyRole = (...allowedRoles) => {
    return async (req, res, next) => {
        try {
            const userEmail = req.user?.email;
            
            if (!userEmail) {
                return res.status(401).send({ message: 'Unauthorized: User email not found' });
            }

            const user = await User.findOne({ email: userEmail });
            
            if (!user) {
                return res.status(404).send({ message: 'User not found' });
            }

            if (!allowedRoles.includes(user.role)) {
                return res.status(403).send({ message: 'Forbidden: Insufficient permissions' });
            }

            req.userRole = user.role;
            next();
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    };
};

module.exports = verifyRole;

