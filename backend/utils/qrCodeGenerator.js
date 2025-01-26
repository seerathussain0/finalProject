import QRCode from 'qrcode';
import fs from 'fs';
import path from 'path';

/**
 * Generates a QR code for the given text and saves it to the specified file path.
 * @param {string} text - The text or data to encode in the QR code.
 * @param {string} filePath - The file path where the QR code image should be saved.
 * @returns {Promise<void>} - Resolves when the QR code is successfully generated and saved.
 */
export const qrCodeGenerator = async (text, filePath) => {
  try {
    // Ensure the directory for the file exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Generate the QR code and save it as an image
    await QRCode.toFile(filePath, text, {
      color: {
        dark: '#000000',  // Dark color for the QR code
        light: '#ffffff', // Light color for the background
      },
      width: 300, // QR code size (adjust as needed)
    });

    console.log(`QR code generated successfully at ${filePath}`);
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw new Error('Failed to generate QR code');
  }
};

