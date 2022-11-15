FROM centos:7.4.1708
MAINTAINER zhaoyang

ENV INSTALL_DIR=/opt/app/php \
    PHP_VERSION=8.1.12 \
    EX_REDIS_VERSION=5.3.7 \
    CMAKE_VERSION=3.24.3 \
    LIBZIP_VERSION=1.9.2 \
    TZ=Asia/Shanghai

ADD src/php-${PHP_VERSION}.tar.gz /tmp/
ADD src/cmake-${CMAKE_VERSION}.tar.gz /tmp/
ADD src/libzip-${LIBZIP_VERSION}.tar.gz /tmp/

RUN yum -y install epel-release \
    && yum update -y \
    && yum -y install gcc gcc-c++ gd-devel libxml2 libxml2-devel libcurl-devel \
    openssl openssl-devel curl curl-devel libjpeg libjpeg-devel libpng  \
    pcre pcre-devel libxslt libxslt-devel bzip2 bzip2-devel oniguruma oniguruma-devel \
    php-mcrypt libmcrypt libmcrypt-devel libpng-devel libsqlite3x libsqlite3x-devel \
    openldap-devel libtidy-devel gmp-devel autoconf re2c libsodium-devel ImageMagick-devel \
    bzip2 bzip2-devel \
    && yum remove -y libzip-devel libzip cmake \
    && yum clean all -y \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo ${TZ} > /etc/timezone \
    && cd /tmp/cmake-${CMAKE_VERSION} \
    && ./bootstrap && gmake && make install \
    && ln -s /usr/local/bin/cmake /usr/bin/ \
    && cd /tmp/libzip-${LIBZIP_VERSION} && mkdir build && cd build \
    && cmake -DCMAKE_INSTALL_PREFIX=/usr/local/lib64 .. \
    && make && make install \
    && echo "/usr/local/lib64" >>/etc/ld.so.conf \
    && ldconfig \
    && export PKG_CONFIG_PATH=/usr/local/lib64/pkgconfig/:$PKG_CONFIG_PATH \
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
    --enable-gd \
    --enable-gd-jis-conv \
    --with-jpeg   \
    --with-freetype  \
    --with-zip \
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
    # && rm -r /tmp/php-${PHP_VERSION} \
    && ln -s ${INSTALL_DIR}/sbin/php-fpm /usr/bin/ \
    && ln -s ${INSTALL_DIR}/bin/php /usr/bin/ \
    && cd /tmp \
    && curl -sS https://getcomposer.org/installer | php \
    && mv composer.phar /usr/local/bin/composer

ADD src/redis-${EX_REDIS_VERSION}.tgz /tmp/

RUN cd /tmp/redis-${EX_REDIS_VERSION} \
    && ${INSTALL_DIR}/bin/phpize \
    && ./configure --with-php-config=${INSTALL_DIR}/bin/php-config \
    && make && make install \
    && rm -r /tmp/redis-${EX_REDIS_VERSION}


COPY ./etc/ ${INSTALL_DIR}/etc

EXPOSE 9000

CMD ["php-fpm", "--nodaemonize"]
