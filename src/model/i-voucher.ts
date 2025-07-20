import type { RedemptionMethod } from './redemption-method';

export interface IBaseVoucher {
  redemptionMethod: RedemptionMethod;
  instructions: string;
  expirationDate?: Date;
}

export interface ICodeVoucher extends IBaseVoucher {
  redemptionMethod: RedemptionMethod.Code | RedemptionMethod.QRCode;
  value: string;
}

export interface ILinkVoucher extends IBaseVoucher {
  redemptionMethod: RedemptionMethod.Link;
  href: string;
  linkText?: string;
}

export interface IManualVoucher extends IBaseVoucher {
  redemptionMethod: RedemptionMethod.Manual;
}

export type IVoucher = ICodeVoucher | ILinkVoucher | IManualVoucher;
