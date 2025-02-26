import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';

describe('<Calculator />', () => {
  test('2개의 숫자에 대해 덧셈이 가능하다.', () => {
    render(<App />);

    const total = screen.getByRole('heading', { level: 1 });

    userEvent.click(screen.getByRole('button', { name: '7' }));
    expect(total).toHaveTextContent('7');

    userEvent.click(screen.getByRole('button', { name: '+' }));
    expect(total).toHaveTextContent(/^7\+$/);

    userEvent.click(screen.getByRole('button', { name: '4' }));
    expect(total).toHaveTextContent('7+4');

    userEvent.click(screen.getByRole('button', { name: '=' }));
    expect(total).toHaveTextContent('11');
  });

  test('2개의 숫자에 대해 뺄셈이 가능하다.', () => {
    render(<App />);

    const total = screen.getByRole('heading', { level: 1 });

    userEvent.click(screen.getByRole('button', { name: '7' }));
    expect(total).toHaveTextContent('7');

    userEvent.click(screen.getByRole('button', { name: '-' }));
    expect(total).toHaveTextContent(/^7-$/);

    userEvent.click(screen.getByRole('button', { name: '4' }));
    expect(total).toHaveTextContent('7-4');

    userEvent.click(screen.getByRole('button', { name: '=' }));
    expect(total).toHaveTextContent('3');
  });

  test('2개의 숫자에 대해 곱셈이 가능하다.', () => {
    render(<App />);

    const total = screen.getByRole('heading', { level: 1 });

    userEvent.click(screen.getByRole('button', { name: '7' }));
    expect(total).toHaveTextContent('7');

    userEvent.click(screen.getByRole('button', { name: 'X' }));
    expect(total).toHaveTextContent(/^7X$/);

    userEvent.click(screen.getByRole('button', { name: '4' }));
    expect(total).toHaveTextContent('7X4');

    userEvent.click(screen.getByRole('button', { name: '=' }));
    expect(total).toHaveTextContent('28');
  });

  test('2개의 숫자에 대해 나눗셈이 가능하다.', () => {
    render(<App />);

    const total = screen.getByRole('heading', { level: 1 });

    userEvent.click(screen.getByRole('button', { name: '7' }));
    expect(total).toHaveTextContent('7');

    userEvent.click(screen.getByRole('button', { name: '/' }));
    expect(total).toHaveTextContent(/^7\/$/);

    userEvent.click(screen.getByRole('button', { name: '4' }));
    expect(total).toHaveTextContent('7/4');

    userEvent.click(screen.getByRole('button', { name: '=' }));
    expect(total).toHaveTextContent('1');
  });

  test('AC(All Clear)버튼을 누르면 0으로 초기화 한다.', () => {
    render(<App />);

    const total = screen.getByRole('heading', { level: 1 });

    userEvent.click(screen.getByRole('button', { name: '7' }));
    expect(total).toHaveTextContent('7');

    userEvent.click(screen.getByRole('button', { name: 'AC' }));
    expect(total).toHaveTextContent('0');
  });

  test('숫자는 한번에 최대 3자리 수까지 입력 가능하다.', () => {
    render(<App />);

    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const total = screen.getByRole('heading', { level: 1 });

    userEvent.click(screen.getByRole('button', { name: '7' }));
    userEvent.click(screen.getByRole('button', { name: '7' }));
    userEvent.click(screen.getByRole('button', { name: '7' }));
    userEvent.click(screen.getByRole('button', { name: '7' }));
    expect(total).toHaveTextContent(/^777$/);

    userEvent.click(screen.getByRole('button', { name: '+' }));
    expect(total).toHaveTextContent('777+');

    userEvent.click(screen.getByRole('button', { name: '7' }));
    userEvent.click(screen.getByRole('button', { name: '7' }));
    userEvent.click(screen.getByRole('button', { name: '7' }));
    userEvent.click(screen.getByRole('button', { name: '7' }));
    expect(total).toHaveTextContent(/^777\+777$/);
  });

  test('연산의 결과값이 Infinity일 경우 오류라는 문자열을 보여준다.', () => {
    render(<App />);

    const total = screen.getByRole('heading', { level: 1 });

    userEvent.click(screen.getByRole('button', { name: '7' }));
    userEvent.click(screen.getByRole('button', { name: '/' }));
    userEvent.click(screen.getByRole('button', { name: '0' }));
    userEvent.click(screen.getByRole('button', { name: '=' }));

    expect(total).toHaveTextContent('오류');
  });
});
