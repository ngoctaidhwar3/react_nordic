const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// declaration
const api = {
  BASE_URL: "https://mapi.sendo.vn/mob/product",
  getCateProductApi: function (slug, p = 1) {
    // slug is category id, for example: thiet-bi-y-te
    return this.BASE_URL + "/cat/" + slug + `?p=${p}`;
  },
  getSearchProductApi: function (p = 1, q) {
    return this.BASE_URL + `/search?p=${p}&q=${q}`; // p is page, q is query
  },
  getProductDetailApi: function (id) {
    // id is product id
    return this.BASE_URL + `/${id}/detail`;
  },
};

const users = [
  { name: "Sĩ Phú", username: "siphu@gmail.com", password: "phu12345" },
  { name: "Trung Hiếu", username: "trunghieu@gmail.com", password: "hieu12345" },
  { name: "Đình Duy", username: "dinhduy@gmail.com", password: "duy12345" },
  // tương tự các user khác
];
const sessions = []; // for logged in users
//
app.get("/cat/:slug", (req, res) => {
  const { slug } = req.params;
  const { p } = req.query;
  console.log("Get product of cat2", req.query);
  console.log(api.getCateProductApi(slug, p));
  fetch(api.getCateProductApi(slug, p))
    .then((result) => result.json())
    .then((json) => res.json(json))
    .catch((err) => {
      console.error(err);
      res.json({ status: "FAILED", message: err.message });
    });
});

app.get("/detail/:id", (req, res) => {
  const { id } = req.params;
  console.log("Get product detail ", id);
  console.log(api.getProductDetailApi(id));
  fetch(api.getProductDetailApi(id))
    .then((result) => result.json())
    .then((json) => res.json(json))
    .catch((err) => {
      console.error(err);
      res.json({ status: "FAILED", message: err.message });
    });
});

app.get("/search", (req, res) => {
  const { p, q } = req.query;
  console.log(`Get product at page ${p}, query ${q}`);
  console.log(api.getSearchProductApi(p, q));
  fetch(api.getSearchProductApi(p, q))
    .then((result) => result.json())
    .then((json) => res.json(json))
    .catch((err) => {
      console.error(err);
      res.json({ status: "FAILED", message: err.message });
    });
});

app.put("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.findIndex(
    (item) => item.username === username && item.password === password
  );
  if (user > -1) {
    const token = username + "_" + Date.now();
    const session = { token, user };
    sessions.push(session);
    return res.json(session);
  } else res.json({ message: "Username or Password is incorrect" });
});

app.delete("/logout", (req, res) => {
  const { token } = req.body;
  const index = sessions.findIndex((item) => item.token === token);
  if (index > -1) {
    sessions.splice(index, 1);
    return res.json({
      status: "SUCCESS",
      message: "Log out success",
    });
  } else
    res.json({
      status: "FAILED",
      message: "Logout failed",
    });
});

// delete product
app.delete('/delete', (req,res)=>{
  const {id} = req.query;
 console.log('id', id)
 // delete product with id
 res.json({
   status: 'SUCCESS',
   message: 'Delete product with id'+id+' success'
 })
})


app.post('/add-product',(req,res)=>{
 console.log(req.body);
 console.log(typeof req.body);
 res.json({
  status: 'SUCCESS',
  message: 'Add new produt success'
})
})

app.put('/edit-product/:id',(req,res)=>{
  console.log(req.params.id)
  res.json({
   status: 'SUCCESS',
   message: 'Edit produt success'
 })
 })

app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});
