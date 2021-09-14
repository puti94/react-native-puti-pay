type wxParams = {
  partnerId: string;
  prepayId: string;
  packageValue: string;
  nonceStr: string;
  timeStamp: string;
  sign: string;
};
type aliRes = {
  memo: string;
  result: string;
  resultStatus: string;
};
type wxRes = {
  errStr: string;
  errCode: string;
  type: string;
};
export declare class XPay {
  static alipay: (orderInfo: string, callback: (res: aliRes) => void) => void;

  static setWxId: (id: string) => void;

  static setAlipayScheme: (scheme: string) => void;

  static setAlipaySandbox: (isSandBox: boolean) => void;

  static wxPay: (params: wxParams, callback: (res: wxRes) => void) => void;
}
