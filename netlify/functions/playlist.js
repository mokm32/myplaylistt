// netlify/functions/playlist.js
import fetch from "node-fetch";

export async function handler(event) {
  try {
    // 🌐 API/URL asal untuk ambil MPD (manifest dengan token baru setiap kali)
    // Biasanya link "manifest.mpd" asal, bukan hasil copy manual.
    const originUrl = "https://l18.dp.sooka.my/wmt/1000/linear/dash/manifest.mpd";

    // 🔄 Fetch manifest terus dari server asal
    const response = await fetch(originUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (OTT Navigator Proxy)"
      }
    });

    if (!response.ok) {
      return { statusCode: response.status, body: "Gagal ambil manifest" };
    }

    let manifest = await response.text();

    // 🛠️ OPTIONAL: Kalau perlu ubah sesuatu dalam manifest
    // Contoh: ganti domain asal dengan Netlify proxy supaya segmen juga jalan
    manifest = manifest.replace(
      /https:\/\/l18\.dp\.sooka\.my\/wmt:[^/]+/g,
      "https://primahd.netlify.app/.netlify/functions/proxy"
    );

    // ✅ Kembalikan manifest yang sudah di-update
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
