# 📦 Playwright Test Suite for ABN AMRO QA Assessment

[![Playwright Tests](https://github.com/sim-mit/testautomation-web/actions/workflows/playwright.yml/badge.svg)](https://github.com/sim-mit/testautomation-web/actions/workflows/playwright.yml)

Page-Object-Model-based test suite (JavaScript + Playwright) for a single-page example app.

[Test Plan (Google Docs)](https://docs.google.com/document/d/1teMDMF6OIJvw8hJnfM8fnCjrFpjXgM78mf1n_v_dq50/edit?usp=sharing)

---

## 🎬 HappyFlow Demo

![Login Flow Demo](.github/assets/AutomationHappyFlow.gif)

---

## 🚀 Features

- **Login Page:** Testing the login functionality and the structure of the login page.
- **Home Page:** Testing the log out functionality and the structure of the home page and navigation bar.
- **Edge-Case Coverage:** Empty fields, invalid creds, SQL injections, etc.
- **Page Object Model:** Clear separation of page structure and test logic.  
- **CI Pipeline Integration:** Tests that run successfully in GitHub pages.  
- **Reporting:** HTML reports in the pipeline.

---

## 📋 Prerequisites

- Node.js LTS (v20+ recommended)  
- npm
- Git

---

## 🛠️ Installation

```bash
git clone https://github.com/sim-mit/testautomation-web.git
cd testautomation-web
npm install
```

## ⚡ Quick Start

### Run locally (headed):
```bash
npx playwright test --headed
```
### Run headless & generate HTML report:
```bash
npx playwright test
npx playwright show-report
```
### Run tests with Playwright UI:
```bash
npx playwright test --ui
```

## 🔁 CI/CD Pipeline
I generated GitHub Actions configuration that works out of the box for CI/CD pipeline integration.
[Pipeline](https://github.com/sim-mit/testautomation-web/actions)

Each pipeline run generates a report that can be downloaded from the artifacts section in the run.
[Example pipeline run](https://github.com/sim-mit/testautomation-web/actions/runs/15280543599)

