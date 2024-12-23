<?php
// URL terenkripsi menggunakan Base64
$protectedURLs = [
    "aHR0cHM6Ly93d3cuZXhhbXBsZS5jb20vbGluazE=",
    "aHR0cHM6Ly93d3cuZXhhbXBsZS5jb20vbGluazI="
];

// Dekripsi URL
function decodeBase64($encoded) {
    return base64_decode($encoded);
}

// Memproses URL
foreach ($protectedURLs as $index => $encodedURL) {
    $decryptedURL = decodeBase64($encodedURL);
    echo "<iframe src='$decryptedURL' style='display:none;'></iframe>\n";

    // Delay 3 detik (simulasi jika dilakukan secara dinamis)
    sleep(3);
}
?>