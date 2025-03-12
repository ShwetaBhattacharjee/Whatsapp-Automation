// Function to shorten the URL using TinyURL API (without an API key)
function shortenUrlWithTinyURL(url) {
  var tinyurlApiUrl = "https://tinyurl.com/api-create.php?url=" + encodeURIComponent(url);
  
  var response = UrlFetchApp.fetch(tinyurlApiUrl);
  var shortenedUrl = response.getContentText();
  
  return shortenedUrl;
}

function sendAINewsToWhatsApp() {
  // GNews API key
  var apiKey = " ";  // Your GNews API key
  
  // URL to fetch AI news from GNews
  var gnewsUrl = "https://gnews.io/api/v4/search?q=artificial+intelligence&token=" + apiKey;

  // Fetch the news from GNews API
  var response = UrlFetchApp.fetch(gnewsUrl);
  var json = JSON.parse(response.getContentText());
  
  // Prepare the list of AI news articles
  var newsList = [];
  var articles = json.articles;

  // Loop through the articles and extract titles and links
  for (var i = 0; i < Math.min(5, articles.length); i++) {
    var title = articles[i].title;
    var link = articles[i].url;

    // Shorten the URL using TinyURL API (no API key required)
    var shortLink = shortenUrlWithTinyURL(link);

    newsList.push("🔹 " + title + "\n" + shortLink);
  }

  // Prepare the AI news message with the latest headlines
  var newsText = "🌟 *AI News Today* 🌟\n\n" + newsList.join("\n") + "\n\n🚀 Stay updated with the latest in AI!";
  
  // Send AI news message to WhatsApp group
  sendMessageToWhatsApp(newsText);

  // Fetch dynamic AI Accounts to Follow using Google Custom Search API
  var accountsText = fetchAIAccountsFromGoogleSearch();
  
  // Send AI accounts message
  sendMessageToWhatsApp(accountsText);
}

// Function to send message via WhatsApp
function sendMessageToWhatsApp(message) {
  var phoneNumber = " ";  // Your WhatsApp number (Sender)
  var apikey = " ";  // Your CallMeBot API key
  var groupId = " ";  // Your WhatsApp Group ID
  
  // Prepare the URL to send message via CallMeBot API (to the group)
  var url = "https://api.callmebot.com/whatsapp.php?phone=" + phoneNumber + "&text=" + encodeURIComponent(message) + "&apikey=" + apikey + "&chatId=" + groupId;
  
  // Send the message to WhatsApp group
  UrlFetchApp.fetch(url);
}

// Function to fetch AI accounts to follow using Google Custom Search API
function fetchAIAccountsFromGoogleSearch() {
  var apiKey = " ";
  var cx = " ";

  var query = "AI experts site:x.com";

  var searchUrl = "https://www.googleapis.com/customsearch/v1?q=" + encodeURIComponent(query) + "&key=" + apiKey + "&cx=" + cx;

  try {
    var response = UrlFetchApp.fetch(searchUrl);
    var result = JSON.parse(response.getContentText());

    if (result && result.items && result.items.length > 0) {
      var accountsText = "\n\n🌐 *AI Accounts to Follow* 🌐\n\n";
      var count = 0;

      for (var i = 0; i < result.items.length && count < 3; i++) {
        var link = result.items[i].link;

        // Extract the profile handle from the URL
        var handleMatch = link.match(/x\.com\/([a-zA-Z0-9_]+)/);
        if (handleMatch && handleMatch[1]) {
          var handle = handleMatch[1];
          var profileUrl = "https://x.com/" + handle; // Construct base profile URL
          // var shortProfileUrl = shortenUrlWithTinyURL(profileUrl); // Shorten the profile URL
          accountsText += (count + 1) + ") " + handle.charAt(0).toUpperCase() + handle.slice(1) + ":\n" + profileUrl + "\n";
          count++;
        }
      }
      if (count === 0) {
        return "\n\n🌐 *AI Accounts to Follow* 🌐\n\nNo valid accounts found.";
      }
      return accountsText;
    } else {
      return "\n\n🌐 *AI Accounts to Follow* 🌐\n\nNo accounts found.";
    }
  } catch (e) {
    return "\n\n🌐 *AI Accounts to Follow* 🌐\n\nError fetching accounts: " + e.toString();
  }
}
