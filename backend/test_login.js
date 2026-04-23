// backend/test_login.js
// Script de prueba para login (Node.js 18+ y 22+ compatible)

async function testLogin() {
  const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
  const response = await fetch('http://localhost:3001/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ usuario: 'Romina', contrasena: 'EOR1107' })
  });
  const data = await response.json();
  console.log(data);
}

testLogin();
