import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => {
  render(<App />);
});

const typeIntoForm = ({ email, password, confirmPassword }) => {
  const emailInputElement = screen.getByRole('textbox', {
    name: /email/i,
  });
  const passwordInputElement = screen.getByLabelText('Password');
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);
  if (email) {
    userEvent.type(emailInputElement, email);
  }
  if (password) {
    userEvent.type(passwordInputElement, password);
  }
  if (confirmPassword) {
    userEvent.type(confirmPasswordInputElement, confirmPassword);
  }

  return {
    emailInputElement,
    passwordInputElement,
    confirmPasswordInputElement,
  };
};

test('input should be initially empty', () => {
  const emailInputElement = screen.getByRole('textbox');
  const passwordInputElement = screen.getByLabelText('Password');
  const confirmPasswordInputElement =
    screen.getByLabelText(/confirm password/i);
  expect(emailInputElement.value).toBe('');
  expect(passwordInputElement.value).toBe('');
  expect(confirmPasswordInputElement.value).toBe('');
});

test('should be able to type an email', () => {
  // const emailInputElement = screen.getByRole('textbox', {
  //   name: /email/i,
  // });
  // userEvent.type(emailInputElement, 'selena@gmail.com');
  const { emailInputElement } = typeIntoForm({ email: 'selena@gmail.com' });
  expect(emailInputElement.value).toBe('selena@gmail.com');
});

test('should be able to type a password', () => {
  // const passwordInputElement = screen.getByLabelText('Password');
  // userEvent.type(passwordInputElement, 'secret');
  const { passwordInputElement } = typeIntoForm({ password: 'secret' });
  expect(passwordInputElement.value).toBe('secret');
});

test('should be able to type a confirm password', () => {
  // const confirmPasswordInputElement =
  //   screen.getByLabelText(/confirm password/i);
  // userEvent.type(confirmPasswordInputElement, 'secret');
  const { confirmPasswordInputElement } = typeIntoForm({
    confirmPassword: 'secret',
  });
  expect(confirmPasswordInputElement.value).toBe('secret');
});

test('should show email error message on invalid email', () => {
  const emailErrorElement = screen.queryByText(
    /the email you input is invalid/i
  ); // null
  const submitBtnElement = screen.getByRole('button', {
    name: /submit/i,
  });

  expect(emailErrorElement).not.toBeInTheDocument();

  typeIntoForm({ email: 'selenagmail.com' });
  userEvent.click(submitBtnElement);

  const emailErrorElementAgain = screen.queryByText(
    /the email you input is invalid/i
  );
  expect(emailErrorElementAgain).toBeInTheDocument();
});

test('should show password error if password is less than 5 characters', () => {
  const passwordErrorElement = screen.queryByText(
    /the password you entered should contain 5 or more character/i
  );
  const submitBtnElement = screen.getByRole('button', {
    name: /submit/i,
  });

  typeIntoForm({ email: 'selena@gmail.com' });
  expect(passwordErrorElement).not.toBeInTheDocument();

  typeIntoForm({ password: 'secr' });
  userEvent.click(submitBtnElement);

  const passwordErrorElementAgain = screen.queryByText(
    /the password you entered should contain 5 or more character/i
  );
  expect(passwordErrorElementAgain).toBeInTheDocument();
});

test("should show password don't match", () => {
  const confirmPasswordErrorElement = screen.queryByText(
    /the password don't match. try again/i
  );
  const submitBtnElement = screen.getByRole('button', {
    name: /submit/i,
  });

  typeIntoForm({ email: 'selena@gmail.com', password: 'secret' });
  expect(confirmPasswordErrorElement).not.toBeInTheDocument();

  typeIntoForm({ confirmPassword: 'nosecret' });
  userEvent.click(submitBtnElement);

  const confirmPasswordErrorElementAgain = screen.queryByText(
    /the password don't match. try again/i
  );
  expect(confirmPasswordErrorElementAgain).toBeInTheDocument();
});

// Happy Path
test('should show no error message if every input is valid', () => {
  const submitBtnElement = screen.getByRole('button', {
    name: /submit/i,
  });

  typeIntoForm({
    email: 'selena@gmail.com',
    password: 'secret',
    confirmPassword: 'secret',
  });
  userEvent.click(submitBtnElement);

  const confirmPasswordErrorElement = screen.queryByText(
    /the password don't match. try again/i
  );
  const passwordErrorElement = screen.queryByText(
    /the password you entered should contain 5 or more character/i
  );
  const emailErrorElement = screen.queryByText(
    /the email you input is invalid/i
  );
  expect(confirmPasswordErrorElement).not.toBeInTheDocument();
  expect(passwordErrorElement).not.toBeInTheDocument();
  expect(emailErrorElement).not.toBeInTheDocument();
});
