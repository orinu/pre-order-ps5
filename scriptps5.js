const axios = require("axios");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: "Gmail",
    auth: {
      user: "nodemailermessengemessenge@gmail.com",
      pass: "YourPass",
    },
  })
);
// hashtag #preorder in subject for ifttt trigger
const mailOptions = {
  from: "nodemailermessengemessenge@gmail.com",
  to: "ori@ezracpa.co.il",
  subject: "#preorderPS5 kravitz open the pre-order of the PS5",
  text: "kravitz open the pre-order",
};

const mailList = ["ori@ezracpa.co.il", "trigger@applet.ifttt.com"];
const urlNintedo =
  "https://www.kravitz.co.il/10024224-%D7%A7%D7%95%D7%A0%D7%A1%D7%95%D7%9C%D7%94-ni" +
  "ntendo-swtich-v1-1#";
const urlPs5 =
  "https://www.kravitz.co.il/10032968-%D7%A7%D7%95%D7%A0%D7%A1%D7%95%D7%9C%D7%94-so" +
  "ny-ps5";
const addToCart = "button action primary tocart sprite";

async function makeGetRequest() {
  let res = await axios.get(urlPs5);
  if (res.status >= 200 && res.status < 300) {
    console.log(`status is ${res.statusText}, status number is ${res.status}`);
    if (res.data.toLowerCase().includes(addToCart.toLowerCase())) {
      //pre order open
      console.log(`there is "add to cart" now`);

      // send mail
      mailList.forEach((address) => {
        mailOptions.to = address;
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log("Email sent: " + info.response);
          }
        });
      });
    } else {
      console.log(`still no "add to cart"`);
    }
  } else {
    console.log(
      `bad status, status is ${res.statusText}, status number is ${res.status}`
    );
  }
}

setInterval(makeGetRequest, 10000);
