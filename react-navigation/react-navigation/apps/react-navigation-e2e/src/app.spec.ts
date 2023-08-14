import { device, element, by, expect } from 'detox';

describe('ReactNavigation', () => {
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should display welcome message', async () => {
    await expect(element(by.id('heading'))).toHaveText(
      'Welcome ReactNavigation 👋'
    );
  });
});
