import { describe, it, expect } from 'vitest';
import { createRandomVoucher } from '../../../testing';
import {
  IVoucherSchema,
  ICodeVoucherSchema,
  ILinkVoucherSchema,
  IManualVoucherSchema,
} from '../../../schema';
import { RedemptionMethod } from '../../../constants';

describe('createRandomVoucher', () => {
  it('creates a random voucher when no arguments are passed.', () => {
    const maybeVoucher = createRandomVoucher();
    const isVoucher = IVoucherSchema.safeParse(maybeVoucher).success;
    expect(isVoucher).toBe(true);
  });

  it('creates a random code voucher if RedemptionMethod.Code is provided as an argument.', () => {
    for (let i = 0; i < 100; i++) {
      const maybeCodeVoucher = createRandomVoucher(RedemptionMethod.Code);
      const isCodeVoucher =
        ICodeVoucherSchema.safeParse(maybeCodeVoucher).success;
      expect(maybeCodeVoucher.redemptionMethod).toBe(RedemptionMethod.Code);
      expect(isCodeVoucher).toBe(true);
    }
  });

  it('creates a random QR code voucher if RedemptionMethod.QRCode is provided as an argument.', () => {
    for (let i = 0; i < 100; i++) {
      const maybeQRCodeVoucher = createRandomVoucher(RedemptionMethod.QRCode);
      const isCodeVoucher =
        ICodeVoucherSchema.safeParse(maybeQRCodeVoucher).success;
      expect(maybeQRCodeVoucher.redemptionMethod).toBe(RedemptionMethod.QRCode);
      expect(isCodeVoucher).toBe(true);
    }
  });

  it('creates a random link voucher if RedemptionMethod.Link is provided as an argument.', () => {
    for (let i = 0; i < 100; i++) {
      const maybeLinkVoucher = createRandomVoucher(RedemptionMethod.Link);
      const isLinkVoucher =
        ILinkVoucherSchema.safeParse(maybeLinkVoucher).success;
      expect(isLinkVoucher).toBe(true);
    }
  });

  it('creates a random manual voucher if RedemptionMethod.Manual is provided as an argument.', () => {
    for (let i = 0; i < 100; i++) {
      const maybeManualVoucher = createRandomVoucher(RedemptionMethod.Manual);
      const isManualVoucher =
        IManualVoucherSchema.safeParse(maybeManualVoucher).success;
      expect(isManualVoucher).toBe(true);
    }
  });
});
