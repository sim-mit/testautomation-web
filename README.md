# 📦 Playwright Test Suite for Test Bank demo page

[![Playwright Tests](https://github.com/sim-mit/testbank-test-automation/actions/workflows/playwright.yml/badge.svg)](https://github.com/sim-mit/testbank-test-automation/actions/workflows/playwright.yml)

Page-Object-Model-based test suite (JavaScript + Playwright) for a single-page example app.

[Test Plan (Google Docs)](https://docs.google.com/document/d/1CRSUAza-FigtZYqL1FUQdlSYu5bsslHBXZeemqGO1XE/edit?usp=sharing)

---

## 🎬 HappyFlow Demo

![Login Flow Demo](.github/assets/TestBank-HappyFlowDemo.gif)

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
git clone https://github.com/sim-mit/testbank-test-automation.git
cd testbank-test-automation
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

## 🔁 CI Pipeline
I generated GitHub Actions configuration that works out of the box for CI/CD pipeline integration.
[Pipeline](https://github.com/sim-mit/testbank-test-automation/actions)

Each pipeline run generates a report that can be downloaded from the artifacts section in the run.
[Example pipeline run](https://github.com/sim-mit/testbank-test-automation/actions/runs/15280543599)

