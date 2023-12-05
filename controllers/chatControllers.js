import mongoose from "mongoose";
import OpenAI from 'openai';
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAIKEY,
});

const msgList = [{
    role: 'system',
    content: 'You have to act like a chatbot for a company website. All answers you give to any further question should resonate with that of a chatbot. Start with a hi like a chatbot would.',
}]; 

export const sendChatMessage = async (req, res) => {
//     console.log('====================================');
//   console.log(req.body.message);
//   console.log('====================================');
  const usrReq = {
    role : "user",
    content: req.body.message
  }
    getResponse(usrReq).then(x => {
      console.log(x)
      res.send(x);
      // addToDb(usrReq,x);
    });
};

async function getResponse(message) {
    console.log("Get response started")

    msgList.push(message);
    // console.log("_______")
    // console.log(msgList)

    const completion = await openai.chat.completions.create({
    messages: msgList,
    model: 'gpt-3.5-turbo',
    });


    msgList.push(completion.choices[0].message);
    // console.log("_______")
    // console.log(msgList)

    return completion.choices[0].message;
}

async function addToDb(usrmsg,airesponse){
  
    usrmsg.time = new Date().toLocaleString();
    airesponse.time = new Date().toLocaleString();
    const arr = [usrmsg,airesponse]
    console.log(arr)
    try {
      await client.connect();
  
      const db = client.db("chatbot");
      const conversation = db.collection("conversations");
  
      const res = await conversation.insertMany(arr);
      console.log(`${res.insertedCount} documents were inserted`);
    } catch (error) {
      console.error("Error inserting documents:", error);
    } finally {
      await client.close();
    }
  }