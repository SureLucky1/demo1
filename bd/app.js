const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");

const JWT_SECRET ="aa";

//const mongoUrl =
//  "mongodb+srv://adarsh:adarsh@cluster0.zllye.mongodb.net/?retryWrites=true&w=majority";
  // const mongoUrl =
  // "mongodb://atlas-sql-6205e6dcc60a6311a2aba3c3-ar39i.a.query.mongodb.net/test?ssl=true&authSource=admin";
  //  const mongoUrl =
  //  "mongodb://atlas-sql-6205e6dcc60a6311a2aba3c3-ar39i.a.query.mongodb.net/myFirstDatabase?ssl=true&authSource=admin";
   const mongoUrl = "mongodb+srv://Ken:Ken2024@cluster0.ar39i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  //  const mongoUrl =
  //  "mongodb+srv://Ken:Ken@cluster0.ar39i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  // const mongoUrl =
  // "mongodb://Ken:Ken@atlas-sql-6205e6dcc60a6311a2aba3c3-ar39i.a.query.mongodb.net/?ssl=true&authSource=admin&appName=atlas-sql-6205e6dcc60a6311a2aba3c3";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((e) => console.log(e));

require("./userDetails");
require("./imageDetails");
require("./productDetails");

const User = mongoose.model("UserInfo");
const Product = mongoose.model("ProductInfo");
const Images = mongoose.model("ImageDetails");

// app.post("/profile/update", async (req, res) => {
//   const { email, useremail, gender, name } = req.body;

//   // Find the user by email
//   const user = await User.findOne({ email: useremail });
//   if (!user) {
//     return res.status(404).json({ error: "User not found" });
//   }

//   // Update user data
//   const updatedUser = await User.findByIdAndUpdate(user, { email, gender, name }, {
//     new: true,
//     useFindAndModify: false,
//   });

//   // Check if the user was successfully updated
//   if (!updatedUser) {
//     return res.status(500).json({ error: "Could not update user" });
//   }

//   res.status(200).json({
//     success: true,
//     user: updatedUser,
//   });
// });
app.post("/profile/update", async (req, res) => {
  const { email, useremail, gender, name } = req.body;

  // Find the user by email
  const user = await User.findOne({ email: useremail });
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Update user data
  const updatedUser = await User.findByIdAndUpdate(user, { email, gender, name }, {
    new: true,
    useFindAndModify: false,
  });

  // Check if the user was successfully updated
  if (!updatedUser) {
    return res.status(500).json({ error: "Could not update user" });
  }

  res.status(200).json({
    success: true,
    user: updatedUser,
  });
});

app.put("/profile/update", async (req, res) => {
  const { email, useremail } = req.body;

  // Find the user by email
  const Record = await Product.find({ userId: useremail });
  if (!Record) {
    return res.status(404).json({ error: "User not found" });
  }

  // Update user data
  const updatedProductInfo = Record.map(async (userId) => {

    return await Product.findByIdAndUpdate(userId, {userId: email}, {
    new: true,
    useFindAndModify: false,
  });
  })

  // Check if the user was successfully updated
  if (!updatedProductInfo ) {
    return res.status(500).json({ error: "Could not update user" });
  }
  await Promise.all(updatedProductInfo);
  res.status(200).json({
    success: true,
  });
});

app.get("/getP/:useremail", async (req, res) => {
  const useremail = req.params.useremail;  // 從請求參數中獲取 useremail

  try {
      const UserPurchaseRecord = await Product.find({ userId: useremail });  // 使用 useremail 作為查詢條件

      if (UserPurchaseRecord) {
          return res.send(UserPurchaseRecord);  // 如果找到購買記錄，則返回記錄
      } else {
          return res.send({ status: "error", message: "No purchase record found for this user." });
      }
  } catch (error) {
      res.send({ status: "error" });
  }
});

app.post("/addP", async (req, res) => {
  const { record, cost, userId } = req.body;

  try {
    const oldUser = await Product.findOne({record});

    if (oldUser) {
      return res.json({ error: "Product Exists" });
    }
    await Product.create({
record, cost, userId
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/register", async (req, res) => {
  const { selectedTimezone, date, contactNumber, email, password, userType } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      selectedTimezone,
      date,
      contactNumber,
      email,
      password: encryptedPassword,
      userType,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});

app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "15m",
    });

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
});

app.get("/profile", async (req, res) => {
  // 從查詢字符串中獲取 token
  const { token, useremail } = req.query;

  if (!token) {
    return res.status(400).json({ status: "error", message: "Token is required" });
  }

  try {
    // 驗證 token
    const decoded = jwt.verify(token, JWT_SECRET);


    // 查找用戶並返回數據
    const user = await User.findOne({ email: useremail });
    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    res.json({ status: "ok", data: user });
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(400).json({ status: "error", message: "Invalid token" });
    } else if (error.name === "TokenExpiredError") {
      return res.status(401).json({ status: "error", message: "Token expired" });
    } else {
      console.error(error);
      return res.status(500).json({ status: "error", message: "Internal server error" });
    }
  }
});


app.listen(5000, () => {
  console.log("Server Started");
});

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });
    const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "adarsh438tcsckandivali@gmail.com",
        pass: "rmdklolcsmswvyfw",
      },
    });

    var mailOptions = {
      from: "youremail@gmail.com",
      to: "thedebugarena@gmail.com",
      subject: "Password Reset",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    console.log(link);
  } catch (error) { }
});

app.get("/reset-password/:useremail/:token", async (req, res) => {
  const { useremail, token } = req.params;
  console.log(req.params);
  const oldUser = await User.findOne({ email: useremail });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email, status: "Not Verified" });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
});

app.post("/reset-password/:useremail/:token", async (req, res) => {
  const {  useremail, token } = req.params;
  console.log(useremail, token)
  const {  password} = req.body;

  const oldUser = await User.findOne({ email: useremail });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET;
  console.log(secret)
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      {
        email: useremail,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
      );
      console.log(secret, token)

    res.render("index", { email: verify.email, status: "verified" });

  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
});

app.get("/getAllUser", async (req, res) => {
  try {
    const allUser = await User.find({});
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
  }
});

app.post("/deleteUser", async (req, res) => {
  const { userid } = req.body;
  try {
    User.deleteOne({ _id: userid }, function (err, res) {
      console.log(err);
    });
    res.send({ status: "Ok", data: "Deleted" });
  } catch (error) {
    console.log(error);
  }
});


app.post("/upload-image", async (req, res) => {
  const { base64 } = req.body;
  try {
    await Images.create({ image: base64 });
    res.send({ Status: "ok" })

  } catch (error) {
    res.send({ Status: "error", data: error });

  }
})

app.get("/get-image", async (req, res) => {
  try {
    await Images.find({}).then(data => {
      res.send({ status: "ok", data: data })
    })

  } catch (error) {

  }
})

app.get("/paginatedUsers", async (req, res) => {
  const allUser = await User.find({});
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)

  const startIndex = (page - 1) * limit
  const lastIndex = (page) * limit

  const results = {}
  results.totalUser=allUser.length;
  results.pageCount=Math.ceil(allUser.length/limit);

  if (lastIndex < allUser.length) {
    results.next = {
      page: page + 1,
    }
  }
  if (startIndex > 0) {
    results.prev = {
      page: page - 1,
    }
  }
  results.result = allUser.slice(startIndex, lastIndex);
  res.json(results)
})
