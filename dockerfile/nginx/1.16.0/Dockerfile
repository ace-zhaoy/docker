FROM centos:7.4.1708
MAINTAINER zhaoyang

ENV INSTALL_DIR=/opt/app/nginx \
    NGINX_VERSION=1.16.0 \
    TZ=Asia/Shanghai

ADD src/nginx-${NGINX_VERSION}.tar.gz /tmp/

RUN yum -y install gcc make pcre-devel zlib-devel wget zip unzip patch bzip2 net-tools perl-dev curl gd-dev luajit-dev \
    kde-l10n-Chinese telnet reinstall glibc-common \
    && yum clean all -y \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo ${TZ} > /etc/timezone \
    && groupadd -g 2000 -f httpd \
    && groupadd -f docker \
    && useradd -u 2000 -d /home/httpd -s /bin/bash -g httpd -G docker httpd \
    && mkdir -p /opt/app \
    && mkdir -p /opt/case \
    && mkdir -p ${INSTALL_DIR}/html \
    && mkdir -p ${INSTALL_DIR}/cache \
    && mkdir -p ${INSTALL_DIR}/logs \
    && cd /tmp/nginx-${NGINX_VERSION} \
    && ./configure --prefix=${INSTALL_DIR} \
        --sbin-path=/${INSTALL_DIR}/sbin/nginx \
        --modules-path=${INSTALL_DIR}/modules \
        --conf-path=${INSTALL_DIR}/conf/nginx.conf \
        --http-client-body-temp-path=${INSTALL_DIR}/cache/client_temp \
        --http-proxy-temp-path=${INSTALL_DIR}/cache/proxy_temp \
        --http-fastcgi-temp-path=${INSTALL_DIR}/cache/fastcgi_temp \
        --http-uwsgi-temp-path=/${INSTALL_DIR}/cache/uwsgi_temp \
        --http-scgi-temp-path=${INSTALL_DIR}/cache/scgi_temp \
        --user=httpd \
        --group=httpd \
        --with-http_addition_module \
        --with-http_auth_request_module \
        --with-http_dav_module \
        --with-http_flv_module \
        --with-http_gunzip_module \
        --with-http_gzip_static_module \
        --with-http_mp4_module \
        --with-http_random_index_module \
        --with-http_realip_module \
        --with-http_secure_link_module \
        --with-http_slice_module \
        --with-http_stub_status_module \
        --with-http_sub_module \
        --with-http_v2_module \
        --with-stream \
        --with-ld-opt="-Wl,-rpath,/usr/local/lib" \
        --with-debug \
    && make -j$(getconf _NPROCESSORS_ONLN) \
    && make install \
    && rm -rf /etc/nginx/html/ \
    && install -m644 html/index.html ${INSTALL_DIR}/html/ \
    && install -m644 html/50x.html ${INSTALL_DIR}/html/ \
    && rm -rf /tmp/nginx-${NGINX_VERSION} \
    && strip ${INSTALL_DIR}/sbin/nginx* \
    && ln -s ${INSTALL_DIR}/sbin/nginx /usr/bin/ \
    && chmod 777 ${INSTALL_DIR}/logs \
    && localedef -c -f UTF-8 -i zh_CN zh_CN.utf8

ENV LC_ALL "zh_CN.UTF-8"

COPY etc/conf/ ${INSTALL_DIR}/conf/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
