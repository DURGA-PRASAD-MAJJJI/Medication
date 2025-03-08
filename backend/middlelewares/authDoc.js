import jwt from 'jsonwebtoken';

// doctor authentication middleware
const authDoc = async (req, res, next) => {
    try {
        const dtoken = req.headers.authorization?.split(' ')[1]; // Used optional chaining to prevent crashes

        if (!dtoken) {
            return res.status(401).json({ success: false, message: 'Permission Declined. Please Relogin.' }); // Added proper status code
        }

        // Verify token with secret key
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);
        req.body.doctorId = token_decode.id;

        next();
    } catch (error) {
        console.error(error); // Changed console.log to console.error for better debugging
        res.status(403).json({ success: false, message: 'Invalid or expired token. Please login again.' }); // Added status code and a more user-friendly message
    }
};

export default authDoc;
