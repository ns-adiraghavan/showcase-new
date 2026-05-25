# Netscribes Showcase â€” EC2 Deployment

## What changed
Converted from TanStack Start (SSR framework) to a plain Vite + React SPA.
The build now outputs a standard `dist/index.html` that works on any static host.

## Build

```bash
npm install
npm run build
# Output: dist/
```

## Deploy to EC2

### 1. Copy dist to server
```bash
scp -r dist/ ec2-user@your-ec2-ip:/var/www/netscribes-showcase/
```

Or via rsync (faster for updates):
```bash
rsync -avz --delete dist/ ec2-user@your-ec2-ip:/var/www/netscribes-showcase/dist/
```

### 2. Install Nginx (if not already)
```bash
sudo apt install nginx        # Ubuntu/Debian
# or
sudo yum install nginx        # Amazon Linux
```

### 3. Install the Nginx config
```bash
sudo cp nginx.conf /etc/nginx/sites-available/netscribes-showcase
sudo ln -s /etc/nginx/sites-available/netscribes-showcase /etc/nginx/sites-enabled/
sudo nginx -t                 # verify config
sudo systemctl reload nginx
```

> **Amazon Linux note:** use `/etc/nginx/conf.d/netscribes-showcase.conf` instead of `sites-available/`.

### 4. Point your subdomain DNS
Add an A record for `showcase.yourdomain.com` â†’ your EC2 public IP.

### 5. HTTPS (recommended)
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d showcase.yourdomain.com
```

## Local dev
```bash
npm run dev        # http://localhost:5173
npm run preview    # preview the production build locally
```
