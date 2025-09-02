document.addEventListener('DOMContentLoaded', function() {
    const urlInput = document.getElementById('urlInput');
    const formatSelect = document.getElementById('formatSelect');
    const borderSize = document.getElementById('borderSize');
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    const qrcodeDiv = document.getElementById('qrcode');
    
    let qrcode = null;
    
    // Inicializar generador QR
    function initQRCode() {
        if (qrcode) {
            qrcodeDiv.innerHTML = '';
        }
        
        qrcode = new QRCode(qrcodeDiv, {
            text: "https://www.ejemplo.com",
            width: 200,
            height: 200,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
    }
    
    initQRCode();
    
    // Generar código QR
    generateBtn.addEventListener('click', function() {
        const url = urlInput.value.trim();
        const border = parseInt(borderSize.value);
        
        if (!url) {
            alert('Por favor, ingresa una URL válida');
            return;
        }
        
        // Validar URL
        if (!isValidUrl(url)) {
            alert('Por favor, ingresa una URL válida. Asegúrate de incluir http:// o https://');
            return;
        }
        
        // Actualizar código QR
        qrcode.clear();
        qrcode.makeCode(url);
        
        // Aplicar borde
        const img = qrcodeDiv.querySelector('img');
        if (img) {
            img.style.border = `${border}px solid white`;
            img.style.borderRadius = '0px';
            img.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';
        }
        
        // Mostrar botón de descarga
        downloadBtn.style.display = 'block';
    });
    
    // Descargar código QR
    downloadBtn.addEventListener('click', function() {
        const img = qrcodeDiv.querySelector('img');
        if (!img) {
            alert('Primero genera un código QR');
            return;
        }
        
        const format = formatSelect.value;
        const border = parseInt(borderSize.value);
        
        // Crear un canvas para dibujar la imagen con borde
        const canvas = document.createElement('canvas');
        const size = img.width + (border * 2);
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        
        // Dibujar fondo blanco para el borde
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, size, size);
        
        // Dibujar la imagen del QR
        ctx.drawImage(img, border, border, img.width, img.height);
        
        // Crear enlace de descarga
        const link = document.createElement('a');
        link.download = `codigo-qr.${format}`;
        link.href = canvas.toDataURL(`image/${format}`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
    
    // Validar URL
    function isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }
    
    // Ejemplo de URL por defecto
    urlInput.value = '';
});