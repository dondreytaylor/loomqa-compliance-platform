import { appConfig } from './appConfig';
import { metadata } from './metadata';

describe('metadata', () => {
  it('stays in sync with appConfig', () => {
    expect(metadata.description).toBe(appConfig.productDescription);
    expect(metadata.title).toBe(`Dashboard · ${appConfig.productName}`);
  });
});
