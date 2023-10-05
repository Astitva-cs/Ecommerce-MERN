import express from 'express'
import { forgotPasswordController, getAllOrdersController, getOrdersController, loginController, orderStatusController, registerController,testController, updateProfileController} from '../controllers/authController.js';
import { isAdmin, requireSignIn } from '../middleware/authmiddleware.js';

//route object

const router= express.Router()

//routing
//Register ||post method
router.post('/register',registerController)
//Login || post
router.post('/login',loginController)
//forgot password
router.post('/forgot-password',forgotPasswordController)


//test route
router.get('/test',requireSignIn,isAdmin,testController)



//protected user route auth
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})

//protected admin route auth
router.get('/admin-auth',requireSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true})
})


//updated profile
router.put('/profile',requireSignIn,updateProfileController)

//order
router.get("/orders", requireSignIn, getOrdersController);


//all orders
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

// order status update
router.put(
    "/order-status/:orderId",
    requireSignIn,
    isAdmin,
    orderStatusController
  );


export default router;

