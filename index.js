const path = require("path")
const express = require("express")
const app = express()
const langs = require("langs")
const franc = require("franc")
const port = 3000

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.get("/", (req, res) => {
  res.render("home")
})

app.get("/catch", (req, res) => {
  // console.log(req.query)  //{ userInput: 'hello world' }
  if (req.query.userInput) {
    const langCode = franc(req.query.userInput)
    console.log(langCode)
    const language = langs.where("3", langCode).name
    const error = null
    console.log(language)
    if (language === "und") {
     const  error = "見つかりませんでした"
    res.render("catch",{language,error})
    } else {
          res.render("catch", { language,error })
    }
  }
   else {
    const error = "入力してください"
    const language = ""
    res.render("catch", {language, error })
  }
})

app.listen(port, () => {
  console.log("実行")
})
