import axios = require("axios");
import type Request = require("express");
import type e = require("express");
import type { BusArrivalResponse, BusArrivalItem } from "./types/busApiType.js";
import nodeSchedule = require("node-schedule");
import nodemailer = require("nodemailer");

require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;
const busArrivalItemToMailHtml = (item: BusArrivalItem): string =>
  `
<h3>${item.routeName ?? ""} 버스 도착 정보</h3>

<p>
  방향: ${item.routeDestName ?? ""}<br/>
  정류소: ${item.stationId ?? ""}
</p>

<hr/>

<strong>첫 번째 차량</strong><br/>
차량번호: ${item.plateNo1 ?? ""}<br/>
도착예정: ${item.predictTime1 ?? ""}분 ${
    item.predictTimeSec1 ? `(${item.predictTimeSec1}초)` : ""
  }<br/>
현재위치: ${item.stationNm1 ?? ""}<br/>
혼잡도: ${item.crowded1 ?? ""}<br/>
빈좌석: ${item.remainSeatCnt1 ?? ""}
<br/><br/>

<strong>두 번째 차량</strong><br/>
차량번호: ${item.plateNo2 ?? ""}<br/>
도착예정: ${item.predictTime2 ?? ""}분 ${
    item.predictTimeSec2 ? `(${item.predictTimeSec2}초)` : ""
  }<br/>
현재위치: ${item.stationNm2 ?? ""}<br/>
혼잡도: ${item.crowded2 ?? ""}<br/>
빈좌석: ${item.remainSeatCnt2 ?? ""}
`.trim();

// 메일 보내기.
const sendMail = async (busData: BusArrivalItem) => {
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
    html: busArrivalItemToMailHtml(busData),
  });
  console.log("msg send:", info.messageId);
};

const cronSpecObj = {
  weekday: "0 */5 7-8 * * 1-5", // 평일 7~8시 사이 5분마다
  dev: "0 * * * * *", // 매 1분
};

// 스케쥴러
const job = nodeSchedule.scheduleJob(cronSpecObj.dev, () => {
  getBusApi();
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
    if (targetBus) {
      await sendMail(targetBus);
    }

    return targetBus;
  } catch (e) {
    console.log(e);
  }
}

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
