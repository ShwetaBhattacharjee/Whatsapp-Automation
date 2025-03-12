---

# WhatsApp Automated AI News & Accounts Script

## Overview:
This Google Apps Script fetches the latest AI news and AI accounts to follow, shortens URLs, and sends the updates to a WhatsApp contact number using the CallMeBot API. It automates the process of keeping a WhatsApp group updated with the latest AI headlines and expert profiles.

## Functionality:
- **Fetches AI News**: Uses the GNews API to retrieve the latest AI-related articles.
- **Shortens URLs**: Utilizes TinyURL to shorten the URLs of news articles.
- **Sends to WhatsApp**: Sends a summary of the AI news and a list of recommended AI accounts to follow to a specified WhatsApp group.
- **Fetches AI Accounts**: Uses the Google Custom Search API to find AI experts and shares their profiles.

## Requirements:
- **GNews API Key**: Needed to fetch AI news.
- **CallMeBot API Key**: Required to send messages to WhatsApp.
- **Google Custom Search API Key & Search Engine ID**: Needed to fetch AI accounts to follow.

## Scheduling:
- You can **automatically trigger the script** to run at a scheduled time (e.g., daily, hourly) by setting up a time-driven trigger in Google Apps Script.
- The script will fetch and send updates to WhatsApp at the specified time, ensuring the group stays updated without manual intervention.

---

