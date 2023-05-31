import { ICalculator } from 'components/Calculator/CalculatorModel';
import { reducer, initialState } from 'components/Calculator/hooks/useCalculator';
import { Digit } from 'constants/calculator';

describe('Calculator reducer', () => {
  let previousState: ICalculator;

  beforeEach(() => {
    previousState = { ...initialState };
  });

  test('핸들링하지 않는 액션 타입을 사용할 경우 에러가 발생해야 한다.', () => {
    const actionType = 'UnhandledActionType';

    // @ts-ignore
    expect(() => reducer(previousState, actionType)).toThrow();
  });

  test('왼쪽 피연산자 추가 핸들링', () => {
    expect(reducer(previousState, { type: 'operand', payload: Digit.FIVE })).toEqual({
      leftOperand: 5,
      rightOperand: null,
      operation: null,
      accumulator: '5',
    });
  });

  test('연산자 추가 핸들링', () => {
    previousState = reducer(previousState, { type: 'operand', payload: Digit.FIVE });

    expect(reducer(previousState, { type: 'operation', payload: '+' })).toEqual({
      leftOperand: 5,
      rightOperand: null,
      operation: '+',
      accumulator: '5+',
    });
  });

  test('오른쪽 피연산자 추가 핸들링', () => {
    previousState = reducer(previousState, { type: 'operand', payload: Digit.FIVE });
    previousState = reducer(previousState, { type: 'operation', payload: '+' });

    expect(reducer(previousState, { type: 'operand', payload: Digit.SEVEN })).toEqual({
      leftOperand: 5,
      rightOperand: 7,
      operation: '+',
      accumulator: '5+7',
    });
  });

  test('계산 결과 추가 핸들링', () => {
    previousState = reducer(previousState, { type: 'operand', payload: Digit.FIVE });
    previousState = reducer(previousState, { type: 'operation', payload: '+' });
    previousState = reducer(previousState, { type: 'operand', payload: Digit.SEVEN });

    expect(reducer(previousState, { type: 'calculate' })).toEqual({
      leftOperand: 12,
      rightOperand: null,
      operation: null,
      accumulator: '12',
    });
  });

  test('전체 초기화 핸들링', () => {
    previousState = reducer(previousState, { type: 'operand', payload: Digit.FIVE });
    previousState = reducer(previousState, { type: 'operation', payload: '+' });
    previousState = reducer(previousState, { type: 'operand', payload: Digit.SEVEN });
    previousState = reducer(previousState, { type: 'calculate' });

    expect(reducer(previousState, { type: 'clear' })).toEqual({
      leftOperand: 0,
      rightOperand: null,
      operation: null,
      accumulator: '0',
    });
  });
});
