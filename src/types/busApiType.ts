export interface BusArrivalResponse {
  response: {
    comMsgHeader: string | null; // 뭔지 모르겠고
    msgHeader: {
      queryTime: string; // 요청시간
      resultCode: number; // 결과코드
      resultMessage: string; // 결과 메시지
    };
    msgBody: {
      busArrivalList: BusArrivalItem[];
    };
  };
}

export interface BusArrivalItem {
  // 차량 차내 혼잡도
  crowded1: number | "" | null;
  crowded2: number | "" | null;

  // 상태구분
  flag: "RUN" | "PASS" | "STOP" | "WAIT" | null;

  // 차량 위치 정보
  locationNo1: number | "" | null;
  locationNo2: number | "" | null;

  // 차량 특수차량 여부
  lowPlate1: number | "" | null;
  lowPlate2: number | "" | null;

  // 차량번호
  plateNo1: string | "" | null;
  plateNo2: string | "" | null;

  // 차량 도착예상시간 (분단위)
  predictTime1: number | "" | null;
  predictTime2: number | "" | null;

  // 차량 도착예상시간 (몇 초후 도착예정. 초단위)
  predictTimeSec1?: number | "" | null;
  predictTimeSec2?: number | "" | null;

  /**
   * 차량 차내빈자리수 (-1:정보없음, 0~:빈자리 수)
   * 차내빈자리수 제공노선유형 (11: 직행좌석형시내버스, 12:좌석형시내버스,
   *                        14: 광역급행형시내버스, 16: 경기순환버스,
   *                        17: 준공영제직행좌석시내버스,
   *                        21: 직행좌석형농어촌버스, 22: 좌석형농어촌버스)
   */
  remainSeatCnt1: number | "" | null;
  remainSeatCnt2: number | "" | null;

  // 진행방향 마지막 정류소아이디
  routeDestId: number | null;
  // 진행방향 마지막 정류소명
  routeDestName: string | null;

  // 노선아이디
  routeId: number | null;
  // 노선명
  routeName: number | string | null;

  /**
   * 	노선유형코드 (11: 직행좌석형시내버스, 12:좌석형시내버스, 13:일반형시내버스,
   *              14: 광역급행형시내버스, 15: 따복형시내버스, 16: 경기순환버스,
   *              21: 직행좌석형농어촌버스, 22: 좌석형농어촌버스, 23:일반형농어촌버스,
   *              30: 마을버스, 41: 고속형시외버스, 42: 좌석형시외버스, 43: 일반형시외버스, 51: 리무진공항버스,
   *              52: 좌석형공항버스, 53: 일반형공항버스)
   */
  routeTypeCd: number | null;

  // 정류소순번
  staOrder: number | null;
  // 정류소 아이디
  stationId: number | null;

  // 차량 위치 정류소명
  stationNm1: string | "" | null;
  stationNm2: string | "" | null;

  // 첫번째 차량 태그리스 서비스 제공여부 (0:일반차량, 1:태그리스차량)
  taglessCd1: number | "" | null;
  taglessCd2: number | "" | null;

  // 노선의 회차점 순번
  turnSeq: number | null;

  // 차량 아이디
  vehId1: number | "" | null;
  vehId2?: number | "" | null;

  // 차량 상태코드 (0:교차로통과, 1:정류소 도착, 2:정류소 출발)
  stateCd1?: number | "" | null;
  stateCd2?: number | "" | null;
}
