const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Starting UniMind Development Environment...\n');

// Start Next.js development server
console.log('📱 Starting Next.js development server...');
const nextProcess = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd()
});

// Start Socket.IO server
console.log('🔌 Starting Socket.IO server...');
const socketProcess = spawn('node', ['server.js'], {
  stdio: 'inherit',
  shell: true,
  cwd: process.cwd()
});

// Handle process exits
const cleanup = () => {
  console.log('\n🛑 Shutting down servers...');
  nextProcess.kill();
  socketProcess.kill();
  process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

// Handle process errors
nextProcess.on('error', (err) => {
  console.error('❌ Next.js process error:', err);
});

socketProcess.on('error', (err) => {
  console.error('❌ Socket.IO process error:', err);
  console.log('ℹ️  Note: Socket.IO server failed to start. The app will work without real-time features.');
});

console.log('✅ Both servers are starting...');
console.log('🌐 Next.js will be available at: http://localhost:3000');
console.log('🔌 Socket.IO server will be available at: http://localhost:3001');
console.log('\nPress Ctrl+C to stop both servers\n');
