FROM centos:7.4.1708
MAINTAINER zhaoyang

ENV INSTALL_DIR=/opt/app/php \
    PHP_VERSION=7.4.8 \
    EX_REDIS_VERSION=5.3.1

ADD src/php-${PHP_VERSION}.tar.gz /tmp/

RUN yum -y install epel-release \
    && yum update -y \
    && yum -y install gcc gcc-c++ gd-devel libxml2 libxml2-devel libcurl-devel \
    openssl openssl-devel curl curl-devel libjpeg libjpeg-devel libpng  \
    pcre pcre-devel libxslt libxslt-devel bzip2 bzip2-devel oniguruma oniguruma-devel \
    php-mcrypt libmcrypt libmcrypt-devel libpng-devel libsqlite3x libsqlite3x-devel \
    openldap-devel libtidy-devel gmp-devel autoconf re2c libsodium-devel ImageMagick-devel cmake \
    && yum clean all -y \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo 'Asia/Shanghai' > /etc/timezone \
    && cd /tmp/php-${PHP_VERSION} \
    && ./configure --prefix=${INSTALL_DIR} \
    --with-config-file-path=${INSTALL_DIR}/etc \
    --disable-ipv6 \
    --enable-bcmath \
    --enable-dba \
    --enable-ftp \
    --enable-mbstring \
    --enable-sockets \
    --enable-exif \
    --enable-opcache \
    --enable-pcntl \
    --enable-soap \
    --with-curl \
    --with-iconv \
    --with-gettext \
    --with-gmp \
    --with-png-dir \
    --with-mhash \
    --with-openssl \
    --with-tidy \
    --with-zlib \
    --with-mysqli=mysqlnd \
    --with-pdo-mysql=mysqlnd \
    --enable-fpm \
    --enable-xml \
    && make && make install \
    && cp ./sapi/fpm/init.d.php-fpm ${INSTALL_DIR}/sbin/init.d.php-fpm \
    && chmod +x ${INSTALL_DIR}/sbin/init.d.php-fpm \
    && groupadd -g 2000 httpd \
    && useradd -g 2000 -u 2000 httpd \
    && mkdir -p /opt/logs/php && chown httpd. /opt/logs/php \
    && rm -r /tmp/php-${PHP_VERSION}

ADD src/redis-${EX_REDIS_VERSION}.tgz /tmp/

RUN cd /tmp/redis-${EX_REDIS_VERSION} \
    && ${INSTALL_DIR}/bin/phpize \
    && ./configure --with-php-config=${INSTALL_DIR}/bin/php-config \
    && make && make install \
    && rm -r /tmp/redis-${EX_REDIS_VERSION}


COPY ./etc/ ${INSTALL_DIR}/etc

EXPOSE 9000

CMD ["/opt/app/php/sbin/php-fpm", "--nodaemonize"]    
