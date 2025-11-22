# GitHub Repository Setup Instructions

## Step 1: Create Repository on GitHub

1. Go to https://github.com/new
2. Repository name: `taxes-management-app` (or your preferred name)
3. Description: "Taxes Management Application built with React, TypeScript, and @tanstack/react-table"
4. Choose **Public** visibility
5. **DO NOT** check "Initialize with README" or add .gitignore/license
6. Click "Create repository"

## Step 2: Push Your Code

After creating the repository, GitHub will show you commands. Use these:

```bash
# Add remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/taxes-management-app.git

# Rename branch to main (if needed)
git branch -M main

# Push to GitHub
git push -u origin main
```

## Alternative: Using SSH

If you prefer SSH:

```bash
git remote add origin git@github.com:YOUR_USERNAME/taxes-management-app.git
git branch -M main
git push -u origin main
```

## Step 3: Verify

Visit your repository URL:
`https://github.com/YOUR_USERNAME/taxes-management-app`

---

# GitLab Setup Instructions

## Step 1: Create Repository on GitLab

1. Go to https://gitlab.com/projects/new
2. Click "Create blank project"
3. Project name: `taxes-management-app`
4. Project slug: `taxes-management-app`
5. Visibility: **Public**
6. Click "Create project"

## Step 2: Push Your Code

```bash
git remote add origin https://gitlab.com/YOUR_USERNAME/taxes-management-app.git
git branch -M main
git push -u origin main
```

---

# Bitbucket Setup Instructions

## Step 1: Create Repository on Bitbucket

1. Go to https://bitbucket.org/repo/create
2. Repository name: `taxes-management-app`
3. Access level: **Public**
4. Click "Create repository"

## Step 2: Push Your Code

```bash
git remote add origin https://bitbucket.org/YOUR_USERNAME/taxes-management-app.git
git branch -M main
git push -u origin main
```

---

# Quick Commands Reference

```bash
# Check current status
git status

# View remote repositories
git remote -v

# Push updates (after initial push)
git push

# Pull latest changes
git pull
```

