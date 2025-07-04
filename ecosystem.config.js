module.exports = {
  apps: [{
    name: 'metadots-v3',
    script: 'npm',
    args: 'start',
    cwd: process.cwd(),
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    env_file: '.env.production',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    error_file: './logs/err.log',
    out_file: './logs/out.log',
    log_file: './logs/combined.log',
    time: true,
    // Add timeout for SSR
    kill_timeout: 5000,
    listen_timeout: 10000,
    // Additional production settings
    min_uptime: '10s',
    max_restarts: 10,
    restart_delay: 4000,
    // Environment variables
    env_production: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}; 