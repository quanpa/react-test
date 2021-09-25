import React from "react";
import AccountList from "./AccountList";
import {render, screen} from "@testing-library/react";
import { setupServer } from "msw/node";
import {rest} from "msw";

const server = setupServer(
  rest.get('https://sample-accounts-api.herokuapp.com/users/1/accounts', (req, res, ctx) => {
    return res(ctx.status(200))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('account list page', () => {
  server.use(
    rest.get('https://sample-accounts-api.herokuapp.com/users/1/accounts', (req, res, ctx) => {
      return res(ctx.status(200))
    })
  )

  render(<AccountList />)

  expect(screen.getByText('ID')).toBeInTheDocument();
  expect(screen.getByText('Name')).toBeInTheDocument();
  expect(screen.getByText('Balance')).toBeInTheDocument();
})
