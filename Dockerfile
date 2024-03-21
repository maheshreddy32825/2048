# Getting the base ubuntu image # 
FROM ubuntu:22.04

# Updating all the packages in our ubuntu machine#
RUN apt-get update

# Installing utilities Nginx, zip and CURL #
RUN apt-get install -y nginx zip curl

# Configuring ngnix #
RUN echo "daemon off;" >>/etc/nginx/nginx.conf

# getting the content to /var..#
RUN curl -o /var/www/html/master.zip -L https://codeload.github.com/gabrielecirulli/2048/zip/master

# unzipiing the content and delete the folder#
RUN cd /var/www/html/ && unzip master.zip && mv 2048-master/* . && rm -rf 2048-master master.zip

# Exposing the port #
EXPOSE 80

# Running the game #
CMD ["/usr/sbin/nginx", "-c", "/etc/nginx/nginx.conf"]

