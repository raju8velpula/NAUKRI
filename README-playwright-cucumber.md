Running Cucumber + Playwright

1. Install dependencies (from project root):

```bash
npm install --save-dev @cucumber/cucumber playwright
npx playwright install
```

2. Run the feature(s):

```bash
npx cucumber-js
```

Notes:
- The feature uses placeholders for email/password — replace them in `features/login.feature` or adapt the steps to read from environment variables.
- You can run headful browser by editing `features/step_definitions/steps.js` and setting `headless: false` in the `chromium.launch` call.
