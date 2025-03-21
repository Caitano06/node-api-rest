const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const AuthController = require("../controllers/AuthController");

// Rota para registrar um novo usuário
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Generate a salt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash the password using the salt
    const hashedPassword = await bcrypt.hash(password, salt);

    // Call the AuthController.registrar function, passing the hashed password
    await AuthController.registrar(req, res, hashedPassword);
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    res
      .status(500)
      .json({ mensagem: "Erro ao registrar usuário", erro: error.message });
  }
});

// Rota para login do usuário
router.post("/login", AuthController.login);

module.exports = router;