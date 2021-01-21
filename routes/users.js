module.exports = app => {
    const UsersController = require('../controllers/UsersController')

    let router = require("express").Router();

    // User signup
    router.post("/signup", UsersController.signUp);

    // User signIn
    router.post("/signin", UsersController.signIn);

    // User logout
    router.get("/logout", UsersController.logout);

    // User Create
    router.post("/", UsersController.store);

    // Retrieve all UsersController
    router.get("/", UsersController.findAll);

    // Retrieve a single Tutorial with id
    router.get("/:id", UsersController.findOne);

    // Update a Tutorial with id
    router.put("/:id", UsersController.update);

    // Delete a Tutorial with id
    router.delete("/:id", UsersController.delete);
    
    app.use('/users', router);
}