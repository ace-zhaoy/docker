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
    apt-get install -y ripgrep && \
    rm -rf /var/lib/apt/lists/*

RUN pip3 install --upgrade pip && pip3 install --no-cache-dir \
    jupyterlab==3.6.3 \
    ipykernel \
    ipywidgets \
    jupyterlab-language-pack-zh-CN \
    jupyterlab-lsp \
    python-lsp-server[all] \
    jupyterlab_execute_time==2.3.1 \
    jupyterlab-search-replace==1.0.2

RUN jupyter lab build

RUN mkdir -p /root/.jupyter/lab/user-settings/@jupyterlab/lsp-plugin && \
    echo '{"language_servers": {"pyls": {"serverSettings": {"pyls": {"plugins": {"pydocstyle": {"enabled": true}, "pyflakes": {"enabled": true}, "flake8": {"enabled": true}, "pylint": {"enabled": true}, "yapf": {"enabled": true}, "autopep8": {"enabled": true}, "mypy": {"enabled": true}, "pycodestyle": {"enabled": true}, "pydocstyle": {"enabled": true}, "rope_completion": {"enabled": true}, "jedi_completion": {"enabled": true}, "jedi_hover": {"enabled": true}, "jedi_references": {"enabled": true}, "jedi_signature_help": {"enabled": true}, "jedi_symbols": {"enabled": true}, "mccabe": {"enabled": true}, "preload": {"enabled": true}, "rope_completion": {"enabled": true}}}}}}}' > /root/.jupyter/lab/user-settings/@jupyterlab/lsp-plugin/plugin.jupyterlab-settings

WORKDIR /app

EXPOSE 8888

CMD ["jupyter", "lab", "--port=8888", "--no-browser", "--ip=0.0.0.0", "--allow-root", "--NotebookApp.token=''"]