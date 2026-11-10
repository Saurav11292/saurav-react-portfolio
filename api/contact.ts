import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  EmailDeliveryError,
  EmailServiceConfigurationError,
  InvalidContactMessageError,
  sendContactEmail,
} from "../server/services/contactEmailService.js";

const requestWindowMs = 15 * 60 * 1000;
const requestLimit = 5;
const recentRequests = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const current = recentRequests.get(ip);

  if (!current || current.resetAt <= now) {
    recentRequests.set(ip, { count: 1, resetAt: now + requestWindowMs });
    return false;
  }

  if (current.count >= requestLimit) return true;
  current.count += 1;
  return false;
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ message: "Method not allowed." });
  }

  const origin = request.headers.origin;
  const allowedOrigin = process.env.CLIENT_ORIGIN;
  if (origin && allowedOrigin && origin !== allowedOrigin) {
    return response.status(403).json({ message: "Origin is not allowed." });
  }

  const forwardedFor = request.headers["x-forwarded-for"];
  const ip =
    typeof forwardedFor === "string"
      ? forwardedFor.split(",")[0].trim()
      : request.socket.remoteAddress ?? "unknown";
  if (isRateLimited(ip)) {
    return response
      .status(429)
      .json({ message: "Too many messages. Please try again later." });
  }

  try {
    await sendContactEmail(request.body);
    return response.status(200).json({ message: "Message sent successfully." });
  } catch (error) {
    if (error instanceof InvalidContactMessageError) {
      return response.status(400).json({ message: error.message });
    }
    if (error instanceof EmailServiceConfigurationError) {
      console.error(error.message);
      return response.status(503).json({ message: error.message });
    }
    if (error instanceof EmailDeliveryError) {
      return response.status(502).json({ message: error.message });
    }

    console.error("Unexpected contact API error:", error);
    return response
      .status(500)
      .json({ message: "Unable to send your message right now." });
  }
}
