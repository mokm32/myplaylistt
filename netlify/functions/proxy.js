// netlify/functions/proxy.js
import fetch from "node-fetch";

export async function handler(event) {
  try {
    // URL asal segmen → ambil dari query param
    const target = event.queryStringParameters.url;
    if (!target) {
      return { statusCode: 400, body: "Parameter 'url' wajib" };
    }

    const response = await fetch(target, {
      headers: {
        "User-Agent": "Mozilla/5.0 (OTT Navigator Proxy)"
      }
    });

    if (!response.ok) {
      return { statusCode: response.status, body: "Gagal ambil segmen" };
    }

    const buffer = await response.arrayBuffer();

    return {
      statusCode: 200,
      body: Buffer.from(buffer).toString("base64"),
      isBase64Encoded: true,
      headers: {
        "Content-Type": response.headers.get("content-type") || "application/octet-stream"
      }
    };

  } catch (err) {
    return { statusCode: 500, body: "Error: " + err.message };
  }
}
