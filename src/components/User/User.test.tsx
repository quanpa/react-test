import React from "react";
import User from "./User";
import {render, screen} from "@testing-library/react";
import { setupServer } from "msw/node";
import {rest} from "msw";
import {BrowserRouter} from "react-router-dom";

const server = setupServer(
  rest.get('https://sample-accounts-api.herokuapp.com/users/1', (req, res, ctx) => {
    return res(ctx.status(200))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

test('account list page', () => {
  server.use(
    rest.get('https://sample-accounts-api.herokuapp.com/users/1', (req, res, ctx) => {
      return res(ctx.status(200))
    })
  )

  render(
    <BrowserRouter>
      <User />
    </BrowserRouter>
  )

  expect(screen.getByText('Name')).toBeInTheDocument();
  expect(screen.getByText('Accounts')).toBeInTheDocument();
})
