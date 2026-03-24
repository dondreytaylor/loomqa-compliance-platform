import { getGlobalUiState } from './uiState';

describe('getGlobalUiState', () => {
  const originalEnv = process.env.LOOPQA_UI_STATE;

  afterEach(() => {
    if (originalEnv === undefined) {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete process.env.LOOPQA_UI_STATE;
    } else {
      process.env.LOOPQA_UI_STATE = originalEnv;
    }
  });

  it('returns NORMAL when env var is unset', () => {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete process.env.LOOPQA_UI_STATE;
    expect(getGlobalUiState()).toBe('NORMAL');
  });

  it('normalizes known values (case/whitespace)', () => {
    process.env.LOOPQA_UI_STATE = '  loading  ';
    expect(getGlobalUiState()).toBe('LOADING');

    process.env.LOOPQA_UI_STATE = ' empty ';
    expect(getGlobalUiState()).toBe('EMPTY_DATA');

    process.env.LOOPQA_UI_STATE = ' errors ';
    expect(getGlobalUiState()).toBe('ERRORED');
  });

  it('falls back to NORMAL for unknown values', () => {
    process.env.LOOPQA_UI_STATE = 'something-else';
    expect(getGlobalUiState()).toBe('NORMAL');
  });
});
