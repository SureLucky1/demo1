const http = require('http');
const url = require('url');
const querystring = require('querystring');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { MongoClient, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

const JWT_SECRET = "aa";
const mongoUrl = "mongodb+srv://Ken:Ken2024@cluster0.ar39i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// MongoDB 连接
let db, usersCollection, productsCollection, imagesCollection;
MongoClient.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    db = client.db();
    usersCollection = db.collection('UserInfo');
    productsCollection = db.collection('ProductInfo');
    imagesCollection = db.collection('ImageDetails');
    console.log("Connected to database");
  })
  .catch(err => console.error(err));

// 服务器创建
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;

  // 处理预检请求
  if (method === 'OPTIONS') {
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    });
    res.end();
    return;
  }

  // 设置CORS头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // 解析 JSON 请求体
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', async () => {
    let data = {};
    if (body) {
      data = JSON.parse(body);
    }

    // 路由和逻辑
    if (parsedUrl.pathname === '/profile/update' && method === 'POST') {
      const { email, useremail, gender, name } = data;
      const user = await usersCollection.findOne({ email: useremail });
      if (!user) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: "User not found" }));
      }
      const updatedUser = await usersCollection.findOneAndUpdate(
        { _id: user._id },
        { $set: { email, gender, name } },
        { returnDocument: 'after' }
      );
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true, user: updatedUser.value }));
    } else if (parsedUrl.pathname === '/profile/update' && method === 'PUT') {
      const { email, useremail } = data;
      const records = await productsCollection.find({ userId: useremail }).toArray();
      if (!records.length) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: "User not found" }));
      }
      const updatePromises = records.map(record => {
        return productsCollection.updateOne(
          { _id: record._id },
          { $set: { userId: email } }
        );
      });
      await Promise.all(updatePromises);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true }));
    } else if (parsedUrl.pathname.startsWith('/getP/') && method === 'GET') {
      const useremail = parsedUrl.pathname.split('/')[2];
      const userPurchaseRecord = await productsCollection.find({ userId: useremail }).toArray();
      if (userPurchaseRecord.length) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(userPurchaseRecord));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: "error", message: "No purchase record found for this user." }));
      }
    } else if (parsedUrl.pathname === '/addP' && method === 'POST') {
      const { record, cost, userId } = data;
      const oldProduct = await productsCollection.findOne({ record });
      if (oldProduct) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: "Product Exists" }));
      }
      await productsCollection.insertOne({ record, cost, userId });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: "ok" }));
    } else if (parsedUrl.pathname === '/register' && method === 'POST') {
      const { selectedTimezone, date, contactNumber, email, password, userType } = data;
      const encryptedPassword = crypto.createHash('sha256').update(password).digest('hex');
      const oldUser = await usersCollection.findOne({ email });
      if (oldUser) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: "User Exists" }));
      }
      await usersCollection.insertOne({ selectedTimezone, date, contactNumber, email, password: encryptedPassword, userType });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: "ok" }));
    } else if (parsedUrl.pathname === '/login-user' && method === 'POST') {
      const { email, password } = data;
      const user = await usersCollection.findOne({ email });
      if (!user) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: "User Not found" }));
      }
      const encryptedPassword = crypto.createHash('sha256').update(password).digest('hex');
      if (encryptedPassword === user.password) {
        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '15m' });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: "ok", data: token }));
      } else {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: "error", error: "Invalid Password" }));
      }
    } else if (parsedUrl.pathname === '/profile' && method === 'GET') {
      const { token, useremail } = parsedUrl.query;
      if (!token) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ status: "error", message: "Token is required" }));
      }
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await usersCollection.findOne({ email: useremail });
        if (!user) {
          res.writeHead(404, { 'Content-Type': 'application/json' });
          return res.end(JSON.stringify({ status: "error", message: "User not found" }));
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: "ok", data: user }));
      } catch (error) {
        if (error.name === "JsonWebTokenError") {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: "error", message: "Invalid token" }));
        } else if (error.name === "TokenExpiredError") {
          res.writeHead(401, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: "error", message: "Token expired" }));
        } else {
          console.error(error);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: "error", message: "Internal server error" }));
        }
      }
    } else if (parsedUrl.pathname === '/forgot-password' && method === 'POST') {
      const { email } = data;
      const oldUser = await usersCollection.findOne({ email });
      if (!oldUser) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ status: "User Not Exists!!" }));
      }
      const secret = JWT_SECRET + oldUser.password;
      const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: '5m' });
      const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'adarsh438tcsckandivali@gmail.com',
          pass: 'rmdklolcsmswvyfw',
        },
      });
      const mailOptions = {
        from: 'youremail@gmail.com',
        to: 'thedebugarena@gmail.com',
        subject: 'Password Reset',
        text: link,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      console.log(link);
    } else if (parsedUrl.pathname.startsWith('/reset-password/') && method === 'GET') {
      const [_, userId, token] = parsedUrl.pathname.split('/');
      const oldUser = await usersCollection.findOne({ _id: new ObjectId(userId) });
      if (!oldUser) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ status: "User Not Exists!!" }));
      }
      const secret = JWT_SECRET + oldUser.password;
      try {
        const verify = jwt.verify(token, secret);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<html><body><form action="/reset-password/${userId}/${token}" method="POST"><input type="password" name="password"/><input type="submit"/></form></body></html>`);
      } catch (error) {
        console.log(error);
        res.writeHead(400, { 'Content-Type': 'text/html' });
        res.end("Not Verified");
      }
    } else if (parsedUrl.pathname.startsWith('/reset-password/') && method === 'PUT') {
      const [_, userId, token] = parsedUrl.pathname.split('/');
      const { password } = data;
      const oldUser = await usersCollection.findOne({ _id: new ObjectId(userId) });
      if (!oldUser) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ status: "User Not Exists!!" }));
      }
      const secret = JWT_SECRET;
      try {
        const verify = jwt.verify(token, secret);
        const encryptedPassword = crypto.createHash('sha256').update(password).digest('hex');
        await usersCollection.updateOne(
          { _id: new ObjectId(userId) },
          { $set: { password: encryptedPassword } }
        );
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end("Password updated successfully");
      } catch (error) {
        console.log(error);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: "Something Went Wrong" }));
      }
    } else if (parsedUrl.pathname === '/upload-image' && method === 'POST') {
      const { base64 } = data;
      try {
        await imagesCollection.insertOne({ image: base64 });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: "ok" }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: "error", data: error }));
      }
    } else if (parsedUrl.pathname === '/get-image' && method === 'GET') {
      try {
        const images = await imagesCollection.find({}).toArray();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: "ok", data: images }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: "error", data: error }));
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: "Not Found" }));
    }
  });
});

server.listen(5000, () => {
  console.log('Server started on port 5000');
});
