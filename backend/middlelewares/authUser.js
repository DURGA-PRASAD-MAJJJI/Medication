import jwt from 'jsonwebtoken'

// user authentication middleware
const authuser = async (req, res, next) => {
    try {
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

        if (!token) {

            return res.json({ success: false, message: 'Permission Declined. Please Relogin.' })
        }

        // Verify token with secret key
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        //console.log('Decoded Token:', token_decode); 
        req.body.userId = token_decode.id

        next()

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export default authuser;
