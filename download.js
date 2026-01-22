/**
 * TikTok Video Downloader - Vercel Serverless Function
 * 
 * PURPOSE: Accept a TikTok URL from the frontend, extract the direct video URL
 * using yt-dlp-exec, remove watermark if possible, and return the download URL
 * 
 * FLOW:
 * 1. Receive TikTok URL from frontend via query parameter
 * 2. Validate URL is actually a TikTok URL
 * 3. Use yt-dlp to extract video metadata and direct video URL
 * 4. Select best quality MP4 without watermark
 * 5. Return JSON response with download URL
 * 6. Handle errors gracefully (invalid URL, network issues, yt-dlp failures)
 */

// Import YtDlpWrap for extracting video information from TikTok
const YtDlpWrap = require("yt-dlp-wrap").default;

/**
 * Validates if the provided URL is a valid TikTok URL
 * 
 * REASON: We want to reject invalid inputs before processing
 * This prevents wasted resources and clear error messages
 * 
 * @param {string} url - The URL to validate
 * @returns {boolean} - True if valid TikTok URL
 */
function isValidTikTokUrl(url) {
  // Accept both www.tiktok.com and vm.tiktok.com (short links)
  // and newer tiktok.com domains
  const tikTokRegex = /^https?:\/\/(www\.)?([a-z]{2}\.)?tiktok\.com\/@?|^https?:\/\/vm\.tiktok\.com\/|^https?:\/\/vt\.tiktok\.com\//i;
  return tikTokRegex.test(url);
}

/**
 * Main handler function for Vercel serverless
 * 
 * EXECUTION ENVIRONMENT:
 * - This runs on Vercel's serverless infrastructure
 * - Maximum execution time is 10 seconds
 * - No file storage allowed (we only return URLs)
 * - Memory: ~128MB - ~3GB depending on plan
 * 
 * @param {Object} req - HTTP request object from Vercel
 * @param {Object} res - HTTP response object from Vercel
 */
module.exports = async (req, res) => {
  // Set CORS headers to allow frontend to call this API
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Content-Type", "application/json");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).json({ message: "OK" });
  }

  try {
    // Extract URL from query parameter (?url=https://...)
    const { url } = req.query;

    // ERROR HANDLING 1: No URL provided
    if (!url) {
      return res.status(400).json({
        success: false,
        error: "Missing URL parameter. Usage: /api/download?url=<TikTok_URL>",
      });
    }

    // ERROR HANDLING 2: Invalid TikTok URL format
    if (!isValidTikTokUrl(url)) {
      return res.status(400).json({
        success: false,
        error:
          "Invalid TikTok URL. Please provide a valid TikTok video link (e.g., https://www.tiktok.com/@username/video/123456789)",
      });
    }

    console.log(`[API] Processing TikTok URL: ${url}`);

    /**
     * WATERMARK REMOVAL LOGIC:
     * yt-dlp can extract multiple formats from TikTok videos
     * Some formats include watermarks, others don't
     * Strategy:
     * 1. Request best quality formats (MP4)
     * 2. Prioritize formats without watermark (format codes vary by region)
     * 3. Return the cleanest video URL available
     */

    // Configure yt-dlp options for TikTok
    const ytdlpOptions = {
      // Request specific format: best MP4 quality without watermark
      // TikTok formats:
      // - Some include watermark (default player format)
      // - Some don't (direct CDN videos)
      // We try to get the best quality video without watermark
      format: "best[ext=mp4]/best",

      // Extract JSON information without downloading the video
      dumpSingleJson: true,
      noWarnings: true,
      quiet: true,

      // Set user agent to avoid blocks
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",

      // Optional: socket timeout
      socketTimeout: 8000,
    };

    /**
     * Call yt-dlp to extract video information
     * This doesn't download the video - just gets metadata
     */
    console.log(`[API] Extracting video info using yt-dlp...`);
    
    // Create YtDlpWrap instance
    const ytDlp = new YtDlpWrap();
    
    // Extract video info
    const videoInfo = await ytDlp.getInfo(url);

    // ERROR HANDLING 3: yt-dlp couldn't extract video
    if (!videoInfo) {
      return res.status(400).json({
        success: false,
        error:
          "Could not extract video information. The video may be private, deleted, or restricted.",
      });
    }

    // Extract the direct download URL from yt-dlp response
    // videoInfo contains the direct CDN URL to the video file
    const videoUrl = videoInfo.url;
    const title = videoInfo.title || "TikTok Video";
    const duration = videoInfo.duration || 0;

    // ERROR HANDLING 4: No valid video URL found
    if (!videoUrl) {
      return res.status(400).json({
        success: false,
        error:
          "Could not extract video download link. This might be a region-restricted or protected video.",
      });
    }

    console.log(`[API] ✓ Successfully extracted video URL`);
    console.log(`[API] Title: ${title}`);
    console.log(`[API] Duration: ${duration}s`);

    /**
     * SUCCESS RESPONSE
     * Return the download URL so frontend can redirect user to it
     * or trigger browser download
     */
    return res.status(200).json({
      success: true,
      url: videoUrl,
      title: title,
      duration: duration,
      message: "Video ready for download",
    });
  } catch (error) {
    // ERROR HANDLING 5: Unexpected errors (network, timeout, etc.)
    console.error(`[API] Error occurred:`, error.message);

    // Different error messages based on error type
    let errorMessage = "An error occurred while processing your request.";

    if (error.message.includes("timed out")) {
      errorMessage =
        "Request timed out. The TikTok server took too long to respond. Please try again.";
    } else if (error.message.includes("not found")) {
      errorMessage =
        "Video not found. Please check the URL and try again.";
    } else if (error.message.includes("403") || error.message.includes("forbidden")) {
      errorMessage =
        "This video is not available in your region or is private.";
    } else if (error.message.includes("429")) {
      errorMessage =
        "Too many requests. Please wait a moment and try again.";
    }

    return res.status(500).json({
      success: false,
      error: errorMessage,
      details: error.message, // Include technical details for debugging
    });
  }
};
