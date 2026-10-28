# 💬 LINE Notify Web

[![ci](https://github.com/jennifershih/line-notify-web/actions/workflows/ci.yml/badge.svg)](https://github.com/jennifershih/line-notify-web/actions/workflows/ci.yml)
[![Angular](https://img.shields.io/badge/Angular-22-DD0031?logo=angular&logoColor=white)](https://angular.dev)
![Status](https://img.shields.io/badge/status-archived%20sample-lightgrey)

Sign in with LINE and send a message with a sticker through LINE Notify.

> **LINE Notify ended on 31 March 2025**, so the app can no longer send messages. The project is kept as a portfolio sample of an OAuth 2.0 authorization-code flow in Angular. For new projects, LINE suggests the Messaging API instead.

**[Demo video (2023) →](https://user-images.githubusercontent.com/17427142/224730130-cd36ff9b-3870-4bc4-b1f1-2cd9f755fc6e.mov)**

## How it worked

1. **Login** — redirects to LINE's authorize page with a random `state`.
2. **Callback** — checks the `state`, then asks a small backend to exchange the `code` for an access token. The client secret lives only on that backend.
3. **Send message** — the token is kept in memory; you write a message, pick a sticker from 15 packages, and post it to the Notify API.

## Built with

- Angular 22 — standalone components, signals, lazy routes, `input()` bound from query params
- Vitest, angular-eslint, Prettier

## Getting started

Requires Node.js 22+.

```bash
npm install
npm start          # http://localhost:4200
```

Endpoints are configured in `src/environments/environment.ts`.

## Scripts

| Command | What it does |
|---|---|
| `npm start` | Dev server |
| `npm run build` | Production build |
| `npm run test:ci` | Unit tests (Vitest) |
| `npm run lint` | ESLint |
