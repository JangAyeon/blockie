export type DailyChartPeriod = "D" | "W" | "M";
/**
 * /oauth2/tokenP
 *
 */
export interface KISAccessTokenResponse {
  access_token: string;
  access_token_token_expired: string; // "YYYY-MM-DD HH:mm:ss" 형식
  token_type: "Bearer";
  expires_in: number; // 초 단위 (예: 86400)
}
/*
 * 주식현재가 시세
 * uapi/domestic-stock/v1/quotations/inquire-price
 */
export interface StockPriceResponse {
  output: {
    iscd_stat_cls_code: string;
    marg_rate: string;
    rprs_mrkt_kor_name: string;
    bstp_kor_isnm: string;
    temp_stop_yn: "Y" | "N";
    oprc_rang_cont_yn: "Y" | "N";
    clpr_rang_cont_yn: "Y" | "N";
    crdt_able_yn: "Y" | "N";
    grmn_rate_cls_code: string;
    elw_pblc_yn: "Y" | "N";
    stck_prpr: string;
    prdy_vrss: string;
    prdy_vrss_sign: string;
    prdy_ctrt: string;
    acml_tr_pbmn: string;
    acml_vol: string;
    prdy_vrss_vol_rate: string;
    stck_oprc: string;
    stck_hgpr: string;
    stck_lwpr: string;
    stck_mxpr: string;
    stck_llam: string;
    stck_sdpr: string;
    wghn_avrg_stck_prc: string;
    hts_frgn_ehrt: string;
    frgn_ntby_qty: string;
    pgtr_ntby_qty: string;
    pvt_scnd_dmrs_prc: string;
    pvt_frst_dmrs_prc: string;
    pvt_pont_val: string;
    pvt_frst_dmsp_prc: string;
    pvt_scnd_dmsp_prc: string;
    dmrs_val: string;
    dmsp_val: string;
    cpfn: string;
    rstc_wdth_prc: string;
    stck_fcam: string;
    stck_sspr: string;
    aspr_unit: string;
    hts_deal_qty_unit_val: string;
    lstn_stcn: string;
    hts_avls: string;
    per: string;
    pbr: string;
    stac_month: string;
    vol_tnrt: string;
    eps: string;
    bps: string;
    d250_hgpr: string;
    d250_hgpr_date: string;
    d250_hgpr_vrss_prpr_rate: string;
    d250_lwpr: string;
    d250_lwpr_date: string;
    d250_lwpr_vrss_prpr_rate: string;
    stck_dryy_hgpr: string;
    dryy_hgpr_vrss_prpr_rate: string;
    dryy_hgpr_date: string;
    stck_dryy_lwpr: string;
    dryy_lwpr_vrss_prpr_rate: string;
    dryy_lwpr_date: string;
    w52_hgpr: string;
    w52_hgpr_vrss_prpr_ctrt: string;
    w52_hgpr_date: string;
    w52_lwpr: string;
    w52_lwpr_vrss_prpr_ctrt: string;
    w52_lwpr_date: string;
    whol_loan_rmnd_rate: string;
    ssts_yn: "Y" | "N";
    stck_shrn_iscd: string;
    fcam_cnnm: string;
    cpfn_cnnm: string;
    frgn_hldn_qty: string;
    vi_cls_code: string;
    ovtm_vi_cls_code: string;
    last_ssts_cntg_qty: string;
    invt_caful_yn: "Y" | "N";
    mrkt_warn_cls_code: string;
    short_over_yn: "Y" | "N";
    sltr_yn: "Y" | "N";
    mang_issu_cls_code: string;
  };
  rt_cd: string;
  msg_cd: string;
  msg1: string;
}

/**
 * 주식현재가 일자별
 * quotations/inquire-daily-price
 */
export interface StockDailyResponse {
  /** 성공 실패 여부 (0: 성공, 1: 실패) */
  rt_cd: string;

  /** 응답 코드 (예: MCA00000) */
  msg_cd: string;

  /** 응답 메시지 (예: 정상처리 되었습니다.) */
  msg1: string;

  /** 응답 상세 데이터 배열 */
  output: StockDailyOutput[];
}

/**
 * 주식 일별 시세 상세 항목
 */
export interface StockDailyOutput {
  /** 주식 영업 일자 (YYYYMMDD) */
  stck_bsop_date: string;

  /** 주식 시가 */
  stck_oprc: string;

  /** 주식 최고가 */
  stck_hgpr: string;

  /** 주식 최저가 */
  stck_lwpr: string;

  /** 주식 종가 */
  stck_clpr: string;

  /** 누적 거래량 */
  acml_vol: string;

  /** 전일 대비 거래량 비율 (%), 소수 8.4 자리 */
  prdy_vrss_vol_rate: string;

  /** 전일 대비 가격 */
  prdy_vrss: string;

  /** 전일 대비 부호 (1: 하락, 2: 상승, 3: 보합, 5: 기타) */
  prdy_vrss_sign: string;

  /** 전일 대비율 (%), 소수 8.2 자리 */
  prdy_ctrt: string;

  /** HTS 외국인 소진율 (%), 소수 8.2 자리 */
  hts_frgn_ehrt: string;

  /** 외국인 순매수 수량 */
  frgn_ntby_qty: string;

  /**
   * 락 구분 코드
   * - 01: 권리락
   * - 02: 배당락
   * - 03: 분배락
   * - 04: 권배락
   * - 05: 중간(분기)배당락
   * - 06: 권리중간배당락
   * - 07: 권리분기배당락
   */
  flng_cls_code: string;

  /** 누적 분할 비율, 소수 8.4 자리 */
  acml_prtt_rate: string;
}

/**
 * 주식당일분봉조회
 * uapi/domestic-stock/v1/quotations/inquire-time-itemchartprice
 */
export interface StockTimeResponse {
  /** 성공 실패 여부 (0: 성공, 1: 실패) */
  rt_cd: string;

  /** 응답 코드 (예: MCA00000) */
  msg_cd: string;

  /** 응답 메시지 (예: 정상처리 되었습니다.) */
  msg1: string;

  /** 응답 상세 (단일) */
  output1: StockOrderCashOutput1;

  /** 응답 상세 (시간별 체결 내역 배열) */
  output2: StockOrderCashOutput2[];
}

/**
 * 응답 상세 (output1) – 종목 요약 정보
 */
export interface StockOrderCashOutput1 {
  /** 전일 대비 변동 (+-변동차이) */
  prdy_vrss: string;

  /** 전일 대비 부호 (1: 하락, 2: 상승, 3: 보합 등) */
  prdy_vrss_sign: string;

  /** 전일 대비율 (소수점 두자리까지 제공) */
  prdy_ctrt: string;

  /** 전일 대비 종가 */
  stck_prdy_clpr: string;

  /** 누적 거래량 */
  acml_vol: string;

  /** 누적 거래대금 */
  acml_tr_pbmn: string;

  /** 한글 종목명 (HTS 기준) */
  hts_kor_isnm: string;

  /** 주식 현재가 */
  stck_prpr: string;
}

/**
 * 응답 상세 (output2) – 시간별 체결 내역
 */
export interface StockOrderCashOutput2 {
  /** 주식 영업일자 (YYYYMMDD) */
  stck_bsop_date: string;

  /** 주식 체결시간 (HHMMSS) */
  stck_cntg_hour: string;

  /** 주식 현재가 */
  stck_prpr: string;

  /** 주식 시가 */
  stck_oprc: string;

  /** 주식 최고가 */
  stck_hgpr: string;

  /** 주식 최저가 */
  stck_lwpr: string;

  /** 체결 거래량 */
  cntg_vol: string;

  /** 누적 거래대금 */
  acml_tr_pbmn: string;
}

// 공통 헤더
export interface ApiResponseHeader {
  "content-type": string; // 컨텐츠타입
  tr_id: string; // 거래ID
  tr_cont?: string; // 연속 거래 여부
  gt_uid?: string; // Global UID
}

// inquire-daily-itemchartprice 응답 구조
export interface InquireDailyItemChartPriceResponse {
  rt_cd: string; // 성공 실패 여부
  msg_cd: string; // 응답코드
  msg1: string; // 응답메세지
  output1: InquireDailyItemChartPriceOutput1; // 응답 상세
  output2: InquireDailyItemChartPriceOutput2[]; // 응답 상세 (리스트)
}

export interface InquireDailyItemChartPriceOutput1 {
  prdy_vrss: string; // 전일 대비
  prdy_vrss_sign: string; // 전일 대비 부호
  prdy_ctrt: string; // 전일 대비율
  stck_prdy_clpr: string; // 주식 전일 종가
  acml_vol: string; // 누적 거래량
  acml_tr_pbmn: string; // 누적 거래 대금
  hts_kor_isnm: string; // HTS 한글 종목명
  stck_prpr: string; // 주식 현재가
  stck_shrn_iscd: string; // 주식 단축 종목코드
  prdy_vol: string; // 전일 거래량
  stck_mxpr: string; // 주식 상한가
  stck_llam: string; // 주식 하한가
  stck_oprc: string; // 주식 시가
  stck_hgpr: string; // 주식 최고가
  stck_lwpr: string; // 주식 최저가
  stck_prdy_oprc: string; // 주식 전일 시가
  stck_prdy_hgpr: string; // 주식 전일 최고가
  stck_prdy_lwpr: string; // 주식 전일 최저가
  askp: string; // 매도호가
  bidp: string; // 매수호가
  prdy_vrss_vol: string; // 전일 대비 거래량
  vol_tnrt: string; // 거래량 회전율
  stck_fcam: string; // 주식 액면가
  lstn_stcn: string; // 상장 주수
  cpfn: string; // 자본금
  hts_avls: string; // HTS 시가총액
  per: string; // PER
  eps: string; // EPS
  pbr: string; // PBR
  itewhol_loan_rmnd_ratem: string; // 전체 융자 잔고 비율
}

export interface InquireDailyItemChartPriceOutput2 {
  stck_bsop_date: string; // 주식 영업 일자
  stck_clpr: string; // 주식 종가
  stck_oprc: string; // 주식 시가
  stck_hgpr: string; // 주식 최고가
  stck_lwpr: string; // 주식 최저가
  acml_vol: string; // 누적 거래량
  acml_tr_pbmn: string; // 누적 거래 대금
  flng_cls_code: string; // 락 구분 코드
  prtt_rate: string; // 분할 비율
  mod_yn: string; // 변경 여부
  prdy_vrss_sign: string; // 전일 대비 부호
  prdy_vrss: string; // 전일 대비
  revl_issu_reas: string; // 재평가사유코드
}
