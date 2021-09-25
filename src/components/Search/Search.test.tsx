import React from "react";
import Search from "./Search";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {rest} from 'msw';
import {setupServer} from 'msw/node';

const server = setupServer(
  rest.get('https://sample-accounts-api.herokuapp.com/users/1', (req, res, ctx) => {
    return res(ctx.json({"attributes":{"id":1,"name":"Alice","account_ids":[1,3,5]}}))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('input and button search', async () => {
  server.use(
    rest.get('https://sample-accounts-api.herokuapp.com/users/1', (req, res, ctx) => {
      return res(ctx.status(200))
    })
  )

  render(<Search />);

  const searchInput = screen.getByPlaceholderText('Please enter User ID');
  const button = screen.getByRole('button', {name: 'Submit'});

  expect(screen.getByRole('button')).toBeDisabled();

  fireEvent.change(searchInput, { target: { value: 1 } });
  expect(screen.getByPlaceholderText('Please enter User ID')).toHaveValue(1);

  expect(screen.getByRole('button')).toBeEnabled();
  fireEvent.click(button);
});

test('not found user', async () => {
  server.use(
    rest.get('https://sample-accounts-api.herokuapp.com/users/5', (req, res, ctx) => {
      return res(ctx.status(500))
    })
  )

  render(<Search />);

  const searchInput = screen.getByPlaceholderText('Please enter User ID');
  fireEvent.change(searchInput, { target: { value: 5 } });

  const button = screen.getByRole('button', {name: 'Submit'});
  fireEvent.click(button);

  await waitFor(() => screen.getByText('Not found user!'));
})
