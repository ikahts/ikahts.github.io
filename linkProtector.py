import base64
import time
from flask import Flask, render_template_string

app = Flask(__name__)

# URL terenkripsi menggunakan Base64
protected_urls = [
    "aHR0cHM6Ly93d3cuZXhhbXBsZS5jb20vbGluazE=",
    "aHR0cHM6Ly93d3cuZXhhbXBsZS5jb20vbGluazI="
]

# Dekripsi URL
def decode_base64(encoded):
    return base64.b64decode(encoded).decode('utf-8')

@app.route('/')
def protect_links():
    frames = ""
    for encoded_url in protected_urls:
        decrypted_url = decode_base64(encoded_url)
        frames += f'<iframe src="{decrypted_url}" style="display:none;"></iframe>\n'
        time.sleep(3)  # Simulasi delay
    return render_template_string(f"""
    <!DOCTYPE html>
    <html>
    <head><title>Proteksi Link</title></head>
    <body>
        <h1>Proteksi Link Berjalan</h1>
        {frames}
    </body>
    </html>
    """)

if __name__ == '__main__':
    app.run(debug=True, port=5000)