import { validatePhoneNumber, mockLogin } from './validation';

describe('validatePhoneNumber', () => {
  it('rejects an empty value', () => {
    const result = validatePhoneNumber('');
    expect(result.valid).toBe(false);
    expect(result.error).toMatch(/required/i);
  });

  it('rejects a number that does not start with +254', () => {
    const result = validatePhoneNumber('0712345678');
    expect(result.valid).toBe(false);
    expect(result.error).toMatch(/\+254/);
  });

  it('rejects a +254 number with the wrong number of digits', () => {
    const result = validatePhoneNumber('+25471234');
    expect(result.valid).toBe(false);
  });

  it('accepts a correctly formatted +254 number', () => {
    const result = validatePhoneNumber('+254712345678');
    expect(result.valid).toBe(true);
    expect(result.error).toBeNull();
  });
});

describe('mockLogin', () => {
  it('fails for an invalid phone number', () => {
    const result = mockLogin('12345');
    expect(result.success).toBe(false);
  });

  it('fails for a well-formatted but unregistered number', () => {
    const result = mockLogin('+254799999999');
    expect(result.success).toBe(false);
    expect(result.error).toMatch(/demo number/i);
  });

  it('succeeds for the demo account number', () => {
    const result = mockLogin('+254712345678');
    expect(result.success).toBe(true);
    expect(result.error).toBeNull();
  });
});
