# Step 9: Playwright - Browser Automation

## What is Playwright?

Playwright is a browser automation tool that lets you:
- **Control browsers programmatically** (Chrome, Firefox, Safari)
- **Automate testing** of web applications
- **Scrape and interact** with web pages
- **Debug visually** with headed mode

It's incredibly useful for:
- Testing your web apps
- Automating repetitive browser tasks
- Web scraping with full JavaScript support
- Taking screenshots and PDFs

## Installation

### Install Playwright CLI

```bash
npm install -g playwright
```

### Install Browser Binaries

Playwright needs browser binaries to control. Install them:

```bash
# Install all browsers (Chromium, Firefox, WebKit)
npx playwright install

# Or install specific browsers
npx playwright install chromium
npx playwright install firefox
npx playwright install webkit
```

### Verify Installation

```bash
npx playwright --version
```

## Quick Test

Open a browser and navigate to a page:

```bash
# Open a browser in headed mode
npx playwright open https://example.com
```

## Basic CLI Commands

| Command | Description |
|---------|-------------|
| `npx playwright open URL` | Open URL in browser |
| `npx playwright screenshot URL file.png` | Take screenshot |
| `npx playwright pdf URL file.pdf` | Generate PDF |
| `npx playwright codegen URL` | Record actions as code |
| `npx playwright install` | Install browsers |
| `npx playwright test` | Run Playwright tests |

## Useful Examples

### Take a Screenshot

```bash
npx playwright screenshot https://github.com screenshot.png
```

### Generate a PDF

```bash
npx playwright pdf https://docs.example.com docs.pdf
```

### Record Actions (Codegen)

This opens a browser and records your clicks/inputs as code:

```bash
npx playwright codegen https://your-app.com
```

Super useful for generating test scripts!

### Open with DevTools

```bash
npx playwright open --browser=chromium https://example.com
```

## Using with Claude Code

Claude Code can help you:

```
> write a Playwright test for the login page

> use Playwright to screenshot all pages in my sitemap

> generate a Playwright script to fill out this form
```

## Project Setup

For a new project with Playwright tests:

```bash
# Initialize Playwright in your project
npm init playwright@latest

# This creates:
# - playwright.config.ts
# - tests/ directory
# - package.json updates
```

## Configuration

Playwright config lives in `playwright.config.ts`:

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
});
```

## Browser Contexts

Playwright lets you manage multiple browser contexts (like incognito windows):

```bash
# In a script, you can create isolated contexts
# Each context has its own cookies, localStorage, etc.
```

## Headed vs Headless

- **Headless** (default): No visible browser window, faster
- **Headed**: Visible browser window, useful for debugging

```bash
# Run headed
npx playwright test --headed

# Run specific browser
npx playwright test --project=chromium
```

## Verification Checklist

- [ ] `npx playwright --version` shows version
- [ ] `npx playwright install` completed successfully
- [ ] `npx playwright open https://example.com` opens browser
- [ ] Can take a screenshot with the CLI

## Integration with Workflow

With Playwright set up, you can:

1. **Test your apps** before deploying
2. **Automate browser tasks** for research
3. **Generate test code** by recording actions
4. **Debug visually** with headed mode and traces

## Learn More

- Documentation: https://playwright.dev
- CLI Reference: https://playwright.dev/docs/cli
- Test Examples: https://playwright.dev/docs/writing-tests
