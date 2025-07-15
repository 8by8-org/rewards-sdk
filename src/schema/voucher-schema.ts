import { z } from "zod";
import { RedemptionMethod } from "../model";
import { maybeDate } from "./maybe-date";

export const baseVoucherSchema = z.object({
  redemptionMethod: z.enum(RedemptionMethod),
  instructions: z.string(),
  expirationDate: maybeDate,
});

export const codeVoucherSchema = baseVoucherSchema.extend({
  redemptionMethod: z.enum([RedemptionMethod.Code, RedemptionMethod.QRCode]),
  value: z.string(),
});

export const linkVoucherSchema = baseVoucherSchema.extend({
  redemptionMethod: z.literal(RedemptionMethod.Link),
  href: z.string(),
  linkText: z.string().optional(),
});

export const manualVoucherSchem = baseVoucherSchema.extend({
  redemptionMethod: z.literal(RedemptionMethod.Manual),
});

export const voucherSchema = codeVoucherSchema
  .or(linkVoucherSchema)
  .or(manualVoucherSchem);
