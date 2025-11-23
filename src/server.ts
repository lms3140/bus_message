import axios = require("axios");
import type Request = require("express");
import type e = require("express");
import type { BusArrivalResponse } from "./types/busApiType.js";
import nodeSchedule = require("node-schedule");
import nodemailer = require("nodemailer");

require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;

// 메일 보내기.
const sendMail = async () => {
  const transporter = nodemailer.createTransport({
    service: "naver",
    host: "smtp.naver.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.NAVER_ID,
      pass: process.env.NAVER_APP_PASS,
    },
  });
  const info = await transporter.sendMail({
    from: process.env.NAVER_ID,
    to: process.env.GOOGLE_ID,
    text: "테스트 함해보이소",
  });
  console.log("msg send:", info.messageId);
};

// 일단 테스트! 서버 켜자마자 실행시키기 싫어서 일단 home 이벤트로 둠
app.get("/", async (req: Request, res: e.Response) => {
  const bus = await getBusApi();
  try {
    await sendMail();
  } catch (e) {
    console.log(e);
  }
  res.send("굿?");
});

// 스케쥴러
const job = nodeSchedule.scheduleJob("0 */5 7-8 * * 1-5", () => {
  console.log("i'm called");
});

async function getBusApi() {
  const BASE_URL = `https://${process.env.BASE_API_URL}/getBusArrivalListv2`;
  const params = `format=json&serviceKey=${process.env.API_KEY}&stationId=${process.env.STATION_ID}`;

  try {
    console.log(process.env.API_KEY);
    const resp = await axios<BusArrivalResponse>(`${BASE_URL}?${params}`);
    const busList = resp.data.response.msgBody.busArrivalList;
    const routeName = 3301;

    const targetBus = busList.find((v) => v.routeName === routeName);

    return targetBus;
  } catch (e) {
    console.log(e);
  }
}

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
