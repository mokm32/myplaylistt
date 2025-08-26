// netlify/functions/playlist.js
import fetch from "node-fetch";

export async function handler(event) {
  try {
    // 🔗 Ganti dengan link MPD asal (yang ada token JWT hidup)
    const originUrl = "https://l18.dp.sooka.my/wmt:eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NTYyMTY4MjYsImlzcyI6IlZSIiwiZXhwIjoxNzU2MjQ3NDAwLCJ3bXZlciI6Mywid21pZGZtdCI6ImFzY2lpIiwid21pZHR5cCI6MSwid21rZXl2ZXIiOjMsIndtdG1pZHZlciI6NCwid21pZGxlbiI6NTEyLCJ3bW9waWQiOjMyLCJ3bWlkIjoiMjU3NWQyYTUtNmQ3YS00M2VjLWFhOGQtOTAwOWJhMjFhMWQwIiwiZmlsdGVyIjoiKHR5cGU9PVwidmlkZW9cIiYmRGlzcGxheUhlaWdodDw9NzIwKXx8KHR5cGU9PVwiYXVkaW9cIiYmZm91ckNDIT1cImFjLTNcIil8fCh0eXBlIT1cInZpZGVvXCImJnR5cGUhPVwiYXVkaW9cIikiLCJwYXR0ZXJuIjoiMTAwMCJ9.gRAEJ1TKpco1zyLQJ7UBg3rWeiovkL3PoXYqkgIEqYc/1000/linear/dash/manifest.mpd";

    // 🔄 Ambil manifest asal
    const response = await fetch(originUrl, {
      headers: {
        // Kalau server asal perlukan header khas, boleh tambah sini
        "User-Agent": "Mozilla/5.0 (OTT Navigator Proxy)"
      }
    });

    if (!response.ok) {
      return { statusCode: response.status, body: "Gagal ambil manifest" };
    }

    const manifest = await response.text();

    // ✅ Kembalikan ke OTT Navigator
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/dash+xml"
      },
      body: manifest
    };

  } catch (err) {
    return { statusCode: 500, body: "Error: " + err.message };
  }
}
