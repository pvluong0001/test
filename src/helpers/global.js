export const generateString = (length = 10, chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') => Array(length).fill('').map((v) => chars[Math.floor(Math.random() * chars.length)]).join('');

