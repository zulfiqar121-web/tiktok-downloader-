/**
 * LOCAL TEST FILE - For testing backend API without frontend
 * 
 * USAGE:
 * 1. Make sure `npm run dev` is running in another terminal
 * 2. Run: node test-local.js <TIKTOK_URL>
 * 3. Or run with example: node test-local.js "https://www.tiktok.com/@tiktok/video/1234567890123456789"
 */

const http = require("http");

// Example TikTok URLs for testing
const testUrls = [
  "https://www.tiktok.com/@tiktok/video/7256519088906111498",
  "https://www.tiktok.com/@tiktok/video/7254614472730470914",
];

/**
 * Test the backend API by making HTTP request
 * 
 * @param {string} url - TikTok URL to test
 */
function testBackend(url) {
  console.log("\n=== TikTok Downloader - Local Test ===\n");
  console.log(`Testing URL: ${url}\n`);
  console.log("📡 Sending request to http://localhost:3000/api/download...\n");

  // Encode URL for query parameter
  const encodedUrl = encodeURIComponent(url);
  const requestPath = `/api/download?url=${encodedUrl}`;

  // Create HTTP request options
  const options = {
    hostname: "localhost",
    port: 3000,
    path: requestPath,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Make the HTTP request
  const req = http.request(options, (res) => {
    let data = "";

    // Collect response chunks
    res.on("data", (chunk) => {
      data += chunk;
    });

    // Handle response completion
    res.on("end", () => {
      console.log(`📊 Response Status: ${res.statusCode}\n`);
      console.log("📝 Response Body:\n");

      try {
        // Parse and format JSON response
        const jsonData = JSON.parse(data);
        console.log(JSON.stringify(jsonData, null, 2));

        // Show results
        if (jsonData.success) {
          console.log("\n✅ SUCCESS!\n");
          console.log(`Title: ${jsonData.title}`);
          console.log(`Duration: ${jsonData.duration} seconds`);
          console.log(`Download URL: ${jsonData.url}\n`);
          console.log("You can now:");
          console.log("1. Copy the URL and paste in browser");
          console.log("2. Open URL directly to download");
          console.log("3. Use 'Save Link As' to download with custom name\n");
        } else {
          console.log("\n❌ ERROR!\n");
          console.log(`Error: ${jsonData.error}\n`);
        }
      } catch (e) {
        console.log("Raw Response (non-JSON):");
        console.log(data);
      }
    });
  });

  // Handle request errors
  req.on("error", (e) => {
    console.log("❌ ERROR: Failed to connect to backend\n");
    console.log(`Error: ${e.message}\n`);
    console.log("Make sure:");
    console.log("1. Run 'npm run dev' in another terminal");
    console.log("2. Server is running on http://localhost:3000");
    console.log("3. Check network connection\n");
  });

  // Send request
  req.end();
}

// Get URL from command line argument or use test URL
const urlFromArgs = process.argv[2];
const urlToTest = urlFromArgs || testUrls[0];

// Run test
testBackend(urlToTest);
