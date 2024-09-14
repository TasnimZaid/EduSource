const express = require("express");
const router = express.Router();
const userController = require("../controller/users");


router.get('/' , (req,res)=>{
    res.json('hh')
});


router.post("/register/teacher", userController.register);

router.post("/login/teacher", userController.loginUser);




// router.post("/register/google", userController.googleSignup);
// router.post("/login/google", userController.googleLogin);

// // Check cookies route
// router.get("/check-cookies", (req, res) => {
//     const userId = req.cookies.userId;
//     if (!userId) {
//         return res.status(400).json({ error: 'userId cookie not found' });
//     }
//     res.json({ success: true, userId });
// });




module.exports = router;
