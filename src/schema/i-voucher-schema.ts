import { z } from 'zod';
import { RedemptionMethod } from '../constants';

export const IBaseVoucherSchema = z.object({
  /**
   * The mechanism by which the user can redeem their reward.
   *
   * @remarks
   * If `redemptionMethod` is {@link RedemptionMethod.Manual}, the voucher
   * should be the only item in the array of vouchers returned by the server to
   * the client. The client should keep a record in its database as to whether
   * or not the user has redeemed this voucher and should also display an
   * interface allowing an employee of the partner to mark it redeemed.
   *
   * Other types of vouchers can freely be returned in any combination.
   */
  redemptionMethod: z.enum(RedemptionMethod),
  /**
   * Partner-specific instructions for redeeming the reward.
   */
  instructions: z.string(),
  /**
   * The date at which the voucher expires. This can be the same as the
   * expiration date of the reward (if any), or can be calculated from the
   * date the user claims the reward. Optional.
   */
  expirationDate: z.coerce.date().optional(),
});

export const ICodeVoucherSchema = IBaseVoucherSchema.extend({
  redemptionMethod: z.enum([RedemptionMethod.Code, RedemptionMethod.QRCode]),
  /**
   * The code that the user can provide to the partner in order to redeem their
   * reward.
   *
   * @remarks
   * If the redemption method is {@link RedemptionMethod.Code},
   * the client should present the `value` as text so that the user can enter it
   * into the appropriate field in the partner's website or app.
   *
   * If the redemption method is {@link RedemptionMethod.QRCode}, the client should
   * present the `value` as a QR code. The user might then present this QR code
   * at one of the partner's physical locations in order to redeem their reward.
   */
  value: z.string(),
});

export const ILinkVoucherSchema = IBaseVoucherSchema.extend({
  redemptionMethod: z.literal(RedemptionMethod.Link),
  /**
   * The actual url to which the user can navigate to redeem their reward.
   *
   * @remarks
   * This could take the user to the partner's website with
   * specific query or route parameters set, or could be a deep link to the
   * partner's app.
   */
  href: z.string(),
  /**
   * The text that the client should display to the user within the anchor tag
   * it should render. Optional.
   */
  linkText: z.string().optional(),
});

export const IManualVoucherSchema = IBaseVoucherSchema.extend({
  redemptionMethod: z.literal(RedemptionMethod.Manual),
});

export const IVoucherSchema =
  ICodeVoucherSchema.or(ILinkVoucherSchema).or(IManualVoucherSchema);

/**
 * Common properties shared by all vouchers.
 */
export type IBaseVoucher = z.infer<typeof IBaseVoucherSchema>;

/**
 * A code-based voucher.
 */
export type ICodeVoucher = z.infer<typeof ICodeVoucherSchema>;

/**
 * A link-based voucher.
 */
export type ILinkVoucher = z.infer<typeof ILinkVoucherSchema>;

/**
 * A voucher that requires manual application by an employee of the partner.
 */
export type IManualVoucher = z.infer<typeof IManualVoucherSchema>;

/**
 * A voucher that can be provided to a partner in order to redeem a reward.
 */
export type IVoucher = ICodeVoucher | ILinkVoucher | IManualVoucher;
