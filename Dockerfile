# Use the php:8.3-apache base image
FROM php:8.3-apache

# Install PDO and PDO MySQL extensions
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd pdo pdo_mysql

# Enable mod_rewrite (useful for many web apps)
RUN a2enmod rewrite

# Set up the working directory
WORKDIR /var/www/html

# Expose port 80
EXPOSE 80