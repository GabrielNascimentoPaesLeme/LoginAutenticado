import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { PrismaClient} from "@prisma/client";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config()

const app = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient()
// Middleware para o Express
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'https://login-autenticado-robk.vercel.app'],
  credentials: true,
}));

async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Conectado ao MongoDB com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar ao MongoDB:', error);
    process.exit(1); // Sai do processo se a conexão falhar
  }
}

// Conectar ao MongoDB antes de iniciar o servidor
connectToDatabase();
/* Gerando o token */
const tokenAccess = (user) => {
  return jwt.sign({
    id: user.id,
    username: user.username
  },
  process.env.JWT_SECRET,
  {expiresIn: process.env.JWT_EXPIRES_IN}
  );
}
/* Gerando refresh token */
const refreshToken = (user) => {
  return jwt.sign({
    id: user.id,
    username: user.username,
  },
  process.env.JWT_REFRESH_SECRET,
  {expiresIn: process.env.JWT_REFRESH_EXPIRES_IN}
  );
}

/* Rota de registro */
app.post("/register", async (req, res) => {
  console.log(req.body)
  const {password, username, email} = req.body
  
  
  if(!password || !username || !email){
    return res.status(400).json({ message: "Username e password são obrigatórios." });
  }
  const existingUser = await prisma.user.findUnique({
    where: {email}
  })
  console.log(existingUser)
  if(existingUser){
    return res.status(400).json({ message: "Email ou userName já cadastrado" });
  }
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    
    const newUser = await prisma.user.create({
      data: {
        username: username, //Recebendo dados do corpo da requisição
        email: email, //Recebendo dados do corpo da requisição
        password: hashPassword, //Recebendo dados da senha criptografada
      }
    });
    console.log(newUser)
    res.status(201).json(newUser)
  } catch (error) {
    res.status(500).json({ error: "Error creating user." });
  }
});

/* Rota de login */
app.post("/login", async (req, res) => {
  console.log(req.body)
  const {username, password} = req.body

  if(!password || !username ){
    return res.status(400).json({ message: "Username e password são obrigatórios." });
  }

  try {
    const user = await prisma.user.findUnique({
      where: {username}
    })

    if(user &&(await bcrypt.compare(password, user.password))){
      const token = tokenAccess(user)
      const newToken = refreshToken(user)
      res.json({token, newToken})
    } else{
      res.status(401).json({error: "Credenciais Inválidas"})
    }

  } catch (error) {
    res.status(500).json({ error: "Erro no servidor" });
  }
});

/* Rota do Refresh Token */
app.post("/refresh-token", async (req, res) => {
  const {newToken} = req.body;
  if(!newToken){
    return res.status(401).json({ error: "Token de atualização é necessário." });
  };
  
  jwt.verify(newToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Token de atualização inválido." });

    const newAccessToken = tokenAccess(user);
    res.json({ accessToken: newAccessToken });
  });
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
