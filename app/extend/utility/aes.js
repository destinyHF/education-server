'use strict';
const crypto = require('crypto');

/**
 * @util 加密、解密工具类
 */
class CryptoUtil {

  /**
   * 解密
   * @param dataStr {string}
   * @param key {string}
   * @param iv {string}
   * @return {string}
   */
  static Decrypt(dataStr, key='9cd5b4cf89949207', iv='e6db271db12d4d47') {
    let cipherChunks = [];
    let decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
    decipher.setAutoPadding(true);
    cipherChunks.push(decipher.update(dataStr, 'base64', 'utf8'));
    cipherChunks.push(decipher.final('utf8'));
    return cipherChunks.join('');
  }

  /**
   * 加密
   * @param dataStr {string}
   * @param key {string}
   * @param iv {string}
   * @return {string}
   */
  static Encrypt(dataStr, key='9cd5b4cf89949207', iv='e6db271db12d4d47') {
    let cipherChunks = [];
    let cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    cipher.setAutoPadding(true);
    cipherChunks.push(cipher.update(dataStr, 'utf8', 'base64'));
    cipherChunks.push(cipher.final('base64'));
    return cipherChunks.join('');
  }
}

module.exports = CryptoUtil;