type ParsedHDFSASP0 = {
  RSYM: string; // 실시간종목코드
  SYMB: string; // 종목코드
  ZDIV: string; // 소숫점 자리수
  XYMD: string; // 현지일자
  XHMS: string; // 현지시간
  KYMD: string; // 한국일자
  KHMS: string; // 한국시간
  BVOL: string; // 매수총잔량
  AVOL: string; // 매도총잔량
  BDVL: string; // 매수총잔량대비
  ADVL: string; // 매도총잔량대비
  PBID1: string; // 매수호가1
  PASK1: string; // 매도호가1
  VBID1: string; // 매수잔량1
  VASK1: string; // 매도잔량1
  DBID1: string; // 매수잔량대비1
  DASK1: string; // 매도잔량대비1
};

export function parseHDFSASP0(raw: string): ParsedHDFSASP0 | null {
  try {
    // 예: "0|HDFSASP0|001|DNASAAPL^AAPL^4^20250910^123255^..."
    const parts = raw.split("|");
    if (parts.length < 4) return null;

    const body = parts[3]; // '^'로 구분된 데이터 부분
    const values = body?.split("^");
    if (!values) return null;
    const keys: (keyof ParsedHDFSASP0)[] = [
      "RSYM",
      "SYMB",
      "ZDIV",
      "XYMD",
      "XHMS",
      "KYMD",
      "KHMS",
      "BVOL",
      "AVOL",
      "BDVL",
      "ADVL",
      "PBID1",
      "PASK1",
      "VBID1",
      "VASK1",
      "DBID1",
      "DASK1",
    ];

    const parsed: Partial<ParsedHDFSASP0> = {};
    keys.forEach((key, idx) => {
      parsed[key] = values[idx] ?? "";
    });

    return parsed as ParsedHDFSASP0;
  } catch (e) {
    console.error("Parse error:", e);
    return null;
  }
}
