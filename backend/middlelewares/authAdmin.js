import jwt from 'jsonwebtoken'

// Admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        const atoken = req.headers.authorization && req.headers.authorization.split(' ')[1];

        if (!atoken) {

            return res.json({ success: false, message: 'Permission Declined. Please Relogin.' })
        }

        // Verify token with secret key
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)
        //console.log('Decoded Token:', token_decode); 

        if (token_decode !== process.env.ADMIN_EMAIL+ process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: 'Permission Declined. Please Re-login.' })
        }

        next()

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export default authAdmin;
