import { renderHook } from '@testing-library/react';

import { useCalculator } from 'components/Calculator/hooks';

describe('useCalculator', () => {
  test('calculator 초기 상태값을 반환받을 수 있어야 한다.', () => {
    const { result } = renderHook(() => useCalculator());

    expect(result.current.calculator).toEqual({
      leftOperand: 0,
      rightOperand: null,
      operation: null,
      accumulator: '0',
    });
  });

  test('합계(total)의 초기값은 0이어야 한다.', () => {
    const { result } = renderHook(() => useCalculator());

    expect(result.current.total).toBe('0');
  });
});
