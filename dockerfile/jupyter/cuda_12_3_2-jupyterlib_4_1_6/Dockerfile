FROM nvidia/cuda:12.3.2-cudnn9-runtime-ubuntu22.04

ENV TZ=Asia/Shanghai

RUN apt-get update &&  \
    apt-get install -y tzdata && \
    cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    echo ${TZ} > /etc/timezone && \
    apt-get install -y \
    python3 \
    python3-pip \
    curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get install -y ripgrep

RUN pip3 install --upgrade pip && pip3 install --no-cache-dir \
    jupyterlab==4.1.6 \
    ipykernel \
    ipywidgets \
    jupyterlab-language-pack-zh-CN \
    jupyterlab-lsp \
    python-lsp-server[all] \
    jupyterlab_execute_time==3.1.2 \
    jupyterlab-search-replace==1.1.0

RUN jupyter lab build

WORKDIR /app

EXPOSE 8888

CMD ["jupyter", "lab", "--port=8888", "--no-browser", "--ip=0.0.0.0", "--allow-root", "--NotebookApp.token=''"]