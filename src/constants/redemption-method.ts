/**
 * A enumeration of possible methods of providing voucher data to a partner in
 * order to redeem a claimed reward.
 */
export enum RedemptionMethod {
  Code = 'code',
  QRCode = 'qr-code',
  Link = 'link',
  Manual = 'manual',
}
