# Use the official PHP 8.2 Apache image
FROM php:8.2-apache

RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli
# Copy the local lab content into the Apache web root directory
COPY . /var/www/html

# Expose port 80 to the host machine
EXPOSE 80