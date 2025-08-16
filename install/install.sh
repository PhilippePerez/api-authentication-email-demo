#!/bin/bash

# 🔧 Configuration
REMOTE_USER="root"
REMOTE_HOST="server1.philippe-perez.com"
DOMAIN_NAME="mywebsite.com"
REMOTE_WEB_DIR="/var/www/$DOMAIN_NAME"
REMOTE_NGINX_CONF="/etc/nginx/sites-available/$DOMAIN_NAME"
LOCAL_WEB_DIR="./dist"
LOCAL_NGINX_CONF="./install/prod/nginx-config.txt"
NGINX_SITES_ENABLED="/etc/nginx/sites-enabled"

cd ..

# 🏗 Step 1: Compress website files
echo "📦 Compressing website files..."
tar -czf website-frontend.tar.gz -C "$LOCAL_WEB_DIR" .

# 📤 Step 2: Transfer website files
echo "🚀 Transferring website files to $REMOTE_HOST..."
scp website-frontend.tar.gz "$REMOTE_USER@$REMOTE_HOST:/tmp/"

# 📥 Step 3: Transfer Nginx configuration file
echo "📄 Transferring Nginx config file..."
scp "$LOCAL_NGINX_CONF" "$REMOTE_USER@$REMOTE_HOST:/tmp/nginx.conf"

# 🔄 Step 4: Connect to the remote server and deploy
echo "🔧 Deploying website on remote server..."
echo "🔧 Remote config : $REMOTE_NGINX_CONF"
echo "🔧 Location      : $REMOTE_WEB_DIR"

ssh "$REMOTE_USER@$REMOTE_HOST" << EOF
    # Ensure Nginx and required directories exist
    sudo mkdir -p $REMOTE_WEB_DIR

    # Extract website files
    sudo tar -xzf /tmp/website-frontend.tar.gz -C $REMOTE_WEB_DIR
    sudo rm /tmp/website-frontend.tar.gz  # Clean up

    # Move Nginx config file
    sudo mv /tmp/nginx.conf $REMOTE_NGINX_CONF
    sudo ln -sf $REMOTE_NGINX_CONF $NGINX_SITES_ENABLED/

    # Set proper permissions
    sudo chown -R www-data:www-data $REMOTE_WEB_DIR
    sudo chmod -R 755 $REMOTE_WEB_DIR

    # Restart Nginx
    echo "🔄 Restarting Nginx..."
    sudo systemctl restart nginx

    # add SSL
    sudo certbot install --redirect --cert-name $DOMAIN_NAME --nginx -d $DOMAIN_NAME -d www.$DOMAIN_NAME

    echo "✅ Website deployed successfully!"
EOF

# 🗑 Step 5: Cleanup
rm website-frontend.tar.gz
echo "🚀 Deployment completed successfully!"
