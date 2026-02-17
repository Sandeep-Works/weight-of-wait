# GitHub Authentication Setup

## Option 1: Personal Access Token (Recommended - Easier)

### Step 1: Create a Personal Access Token on GitHub

1. Go to GitHub.com and sign in
2. Click your profile picture (top right) → **Settings**
3. Scroll down to **Developer settings** (left sidebar, at the bottom)
4. Click **Personal access tokens** → **Tokens (classic)**
5. Click **Generate new token** → **Generate new token (classic)**
6. Give it a name: `Moodful Loaders Project`
7. Select expiration: **90 days** (or No expiration if you prefer)
8. Check these scopes:
   - ✅ **repo** (Full control of private repositories)
9. Click **Generate token**
10. **COPY THE TOKEN IMMEDIATELY** (you won't see it again!)
   - It will look like: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### Step 2: Use the Token to Push

When you push to GitHub, use your token as the password:

```bash
git push -u origin main
# Username: YOUR_GITHUB_USERNAME
# Password: PASTE_YOUR_TOKEN_HERE
```

Git will save your credentials, so you only need to do this once.

---

## Option 2: SSH Keys (More Secure)

### Step 1: Generate SSH Key

Run this command in your terminal:

```bash
ssh-keygen -t ed25519 -C "ar.sandeepmajumder@gmail.com"
```

- Press Enter to accept default file location
- Press Enter twice for no passphrase (or set one if you prefer)

### Step 2: Copy Your Public Key

```bash
cat ~/.ssh/id_ed25519.pub
```

Copy the entire output (starts with `ssh-ed25519`)

### Step 3: Add SSH Key to GitHub

1. Go to GitHub.com → Settings → **SSH and GPG keys**
2. Click **New SSH key**
3. Title: `Mac Mini - Moodful Loaders`
4. Paste your public key
5. Click **Add SSH key**

### Step 4: Test Connection

```bash
ssh -T git@github.com
```

You should see: "Hi YOUR_USERNAME! You've successfully authenticated..."

---

## Quick Setup Script

I've created a helper script. After setting up authentication, you can use it!

