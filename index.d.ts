export declare type XpayProps = {};

export declare class XPay extends React.Component<XpayProps> {
  alipay: (orderInfo: any, callback: () => any) => void;

  setWxId: (id: string) => void;

  setAlipayScheme: (scheme: string) => void;

  setAlipaySandbox: (scheme: string) => void;

  wxPay: (params: any, callback: () => any) => void;
}
