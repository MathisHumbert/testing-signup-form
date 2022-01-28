import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('input should be initially empty', () => {
  render(<App />);
  const emailInputElement = screen.getByRole('textbox');
  const passwordInputElement = screen.getByLabelText('Password');
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);
  expect(emailInputElement.value).toBe('');
  expect(passwordInputElement.value).toBe('');
  expect(confirmPasswordInputElement.value).toBe('');
});

test('should be able to type an email', () => {
  render(<App />);
  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i,
  });
  userEvent.type(emailInputElement, 'selena@gmail.com');
  expect(emailInputElement.value).toBe('selena@gmail.com');
});

test('should be able to type a password', () => {
  render(<App />);
  const passwordInputElement = screen.getByLabelText('Password');
  userEvent.type(passwordInputElement, 'secret');
  expect(passwordInputElement.value).toBe('secret');
});

test('should be able to type a confirm password', () => {
  render(<App />);
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);
  userEvent.type(confirmPasswordInputElement, 'secret');
  expect(confirmPasswordInputElement.value).toBe('secret');
});

test('should show email error message on invalid email', () => {
  render(<App />);
  const emailErrorElement = screen.queryByText(
    /the email you input is invalid/i
  ); // null
  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i,
  });
  const submitBtnElement = screen.getByRole('button', {
    name: /submit/i,
  });

  expect(emailErrorElement).not.toBeInTheDocument();

  userEvent.type(emailInputElement, 'selenagmail.com');
  userEvent.click(submitBtnElement);

  const emailErrorElementAgain = screen.queryByText(
    /the email you input is invalid/i
  );
  expect(emailErrorElementAgain).toBeInTheDocument();
});

test('should show password error if password is less than 5 characters', () => {
  render(<App />);
  const passwordInputElement = screen.getByLabelText('Password');
  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i,
  });
  const submitBtnElement = screen.getByRole('button', {
    name: /submit/i,
  });

  userEvent.type(emailInputElement, 'selena@gmail.com');
  userEvent.type(passwordInputElement, 'secr');
  userEvent.click(submitBtnElement);

  const passwordErrorElement = screen.queryByText(
    /the password you entered should contain 5 or more character/i
  );
  expect(passwordErrorElement).toBeInTheDocument();
});

test("should show password don't match", () => {
  render(<App />);
  const passwordInputElement = screen.getByLabelText('Password');
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);
  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i,
  });
  const submitBtnElement = screen.getByRole('button', {
    name: /submit/i,
  });

  userEvent.type(emailInputElement, 'selena@gmail.com');
  userEvent.type(passwordInputElement, 'secret');
  userEvent.type(confirmPasswordInputElement, 'nosecret');
  userEvent.click(submitBtnElement);

  const submitPasswordErrorElement = screen.queryByText(
    /the password don't match. try again/i
  );
  expect(submitPasswordErrorElement).toBeInTheDocument();
});
