const express = require("express");
const app = express();
const cors= require("cors")
const novelRouter = require("./routers/novelRouter");
const utilRouter=require("./routers/utilRouter");
const userRouter = require("./routers/userRouter");
const queryRouter= require("./routers/queryRouter");
const checkoutRouter = require("./routers/checkoutRouter");

app.use(express.json())
app.use(express.static("./uploads"));
app.use(express.static("./public"));


const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);

const connectedUsers = {};

const io = new Server(httpServer, {
  cors: { origin: ['https://bookworms2.herokuapp.com'] },
});

io.on("connection", (socket) => {
  console.log("client connected");

  io.on("add", (userid) => {
    connectedUsers[userid] = socket.id;
  });

  io.on("checkuser", (userid) => {
    io.emit(
      "isonline",
      connectedUsers[userid]
        ? { status: online, socketid: connectedUsers[userid] }
        : { status: offline }
    );
  });
  // on function is used for receieving the event
  socket.on("sendmsg", (data) => {
    console.log(data);
    data.sent = false;
    socket.broadcast.emit("recmsg", data);
  });
});


const stripe_sk =
  "sk_test_51L9UchSGopJ23bmkXYRxEdMWV8S5bXWljyDIbpql14WzZXLZwKBzxmrqJxx3yyVwFWdeLw2V6vxfAxLx3GXImQIw00lqMTO9in";
const stripe = require("stripe")(stripe_sk);

app.use(
  cors({
     origin:['https://bookworms2.herokuapp.com']
  })
)

app.get("/", (req, res) => {
   res.send("home");
 });

app.use('/user' ,userRouter);
app.use('/novel',novelRouter);
app.use('/util' ,utilRouter);
app.use('/query'  ,queryRouter);
app.use('/checkout',checkoutRouter);

app.post("/create-payment-intent", async (req, res) => {
  const data = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: data.amount,
    currency: "inr",
  });
  res.status(200).json(paymentIntent);
});

app.get("/", (req, resp) => {
  resp.send("home");
});

const port = process.env.PORT || 5000;

httpServer.listen(port, () => {
   console.log("server started");
 });
