import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import { authSocket, socketServer } from "./socketServer.js";
import postsRouter from "./routes/posts.js";
import usersRouter from "./routes/users.js";
import commentsRouter from "./routes/comments.js";
import messagesRouter from "./routes/messages.js";
import chatbotRouter from "./routes/chatbotRouter.js"
import PostLike from "./models/PostLike.js";
import Post from "./models/Post.js";

// import OpenAI from 'openai';

dotenv.config();

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
mongoose.set('strictQuery', true);

io.use(authSocket);
io.on("connection", (socket) => socketServer(socket));

const PORT = process.env.PORT || 4000;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));

app.use(express.json());
app.use(cors());
app.use("/api/posts", postsRouter);
app.use("/api/users", usersRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/chatbot", chatbotRouter);

const msgList = [{
  role: 'system',
  content: 'You have to act like a chatbot for a company website. All answers you give to any further question should resonate with that of a chatbot. Start with a hi like a chatbot would.',
}]; 

app.get("/", function(req,res){
    initialize().then(x=> {
      res.send(x);
    });
});

async function initialize(){
    const completion = await openai.chat.completions.create({
        messages: msgList,
        model: 'gpt-3.5-turbo'
    });
    msgList.push(completion.choices[0].message)
    // console.log("_______")
    // console.log(msgList)
    return (completion.choices[0].message)
    
}

if (process.env.NODE_ENV == "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}
