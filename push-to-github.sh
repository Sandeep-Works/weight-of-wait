#!/bin/bash

# Script to push project to GitHub
# Replace YOUR_USERNAME with your actual GitHub username

echo "Please enter your GitHub username:"
read GITHUB_USERNAME

if [ -z "$GITHUB_USERNAME" ]; then
    echo "Error: GitHub username is required"
    exit 1
fi

REPO_NAME="moodful-loaders"

echo "Setting up remote repository..."
git remote add origin https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git 2>/dev/null || git remote set-url origin https://github.com/${GITHUB_USERNAME}/${REPO_NAME}.git

echo "Pushing to GitHub..."
git branch -M main
git push -u origin main

echo "Done! Your repository is now at: https://github.com/${GITHUB_USERNAME}/${REPO_NAME}"

