# Google Calendar CLI Setup

Interactive walkthrough for setting up gcalcli with Google OAuth.

**Time estimate: 5-10 minutes**
**Requires: Browser access to Google Cloud Console**

## Before Starting

Ask: "This requires creating an OAuth app in Google Cloud Console. It takes about 5-10 minutes. Ready to start?"

If they want to skip: "No problem! You can run `/setup-gcalcli` anytime later."

---

## Step 1: Install gcalcli

```bash
brew install gcalcli
```

Verify: `gcalcli --version`

---

## Step 2: Google Cloud Console

Say: "Open Google Cloud Console in your browser:"

```
https://console.cloud.google.com/
```

Ask: "Are you logged into your Google account and see the console?"

---

## Step 3: Create or Select Project

Say: "Click the project dropdown at the top and either:"
- Select an existing project, OR
- Click 'New Project' and create one (name it anything, like 'gcalcli')

Ask: "Do you have a project selected?"

---

## Step 4: Enable Calendar API

Say: "Now we need to enable the Google Calendar API:"

1. Click the hamburger menu (☰) top left
2. Go to **APIs & Services** → **Library**
3. Search for "Google Calendar API"
4. Click on it and press **Enable**

Ask: "Do you see 'API Enabled' or a dashboard for Google Calendar API?"

---

## Step 5: OAuth Consent Screen

Say: "Now set up the OAuth consent screen:"

1. Go to **APIs & Services** → **OAuth consent screen**
2. Select **External** (unless you have Workspace, then Internal)
3. Click **Create**
4. Fill in:
   - App name: `gcalcli`
   - User support email: your email
   - Developer contact: your email
5. Click **Save and Continue**
6. Skip Scopes (just click **Save and Continue**)
7. Add yourself as a Test User (your email)
8. Click **Save and Continue**

Ask: "Done with the consent screen? You should see a summary."

---

## Step 6: Create Credentials

Say: "Almost there! Now create the OAuth credentials:"

1. Go to **APIs & Services** → **Credentials**
2. Click **+ CREATE CREDENTIALS** → **OAuth client ID**
3. Application type: **Desktop app**
4. Name: `gcalcli`
5. Click **Create**

Say: "You should now see a popup with your **Client ID** and **Client Secret**. Keep this open!"

Ask: "Do you see the Client ID and Client Secret?"

---

## Step 7: Configure gcalcli

Say: "Now run gcalcli init and paste your credentials:"

```bash
gcalcli init
```

Say: "It will ask for:"
1. Your Client ID - paste it
2. Your Client Secret - paste it

Then a browser window will open for you to authorize.

Ask: "Did the browser open? Log in and authorize the app."

---

## Step 8: Test It

Say: "Let's test it! Run:"

```bash
gcalcli agenda
```

Ask: "Do you see your upcoming calendar events?"

---

## Success!

Say: "You're all set! Here are some useful commands:"

```bash
gcalcli agenda              # Show upcoming events
gcalcli calw                # Week view
gcalcli calm                # Month view
gcalcli add                 # Add an event
gcalcli remind              # Set a reminder
```

Say: "You can also ask me things like 'what's on my calendar today?' and I can use gcalcli to check."

---

## Troubleshooting

### "Invalid client" error
- Double-check the Client ID and Secret were copied correctly
- Make sure you added yourself as a Test User

### Browser didn't open
- Run `gcalcli init` again
- Or manually visit the URL it prints

### Token expired
```bash
rm ~/.gcalcli_oauth
gcalcli init
```
Then re-authenticate.
