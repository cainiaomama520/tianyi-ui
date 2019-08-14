FROM node as builder
MAINTAINER ranpop
ENV TZ=Asia/Shanghai LANG="C.UTF-8"
RUN \
    rm /etc/localtime && \
    ln -s /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
WORKDIR /tianyi-ui

ADD ./package.json /tianyi-ui

# RUN npm install --production --registry=https://registry.npm.taobao.org
RUN npm install --registry=https://registry.npm.taobao.org
#RUN npm install --registry=https://registry.npm.taobao.org transform-vue-jsx
RUN npm rebuild node-sass

ADD . /tianyi-ui
RUN npm run build


FROM nginx as prod

MAINTAINER Ranpop
ENV TZ=Asia/Shanghai LANG="C.UTF-8"
WORKDIR /tianyi-ui
COPY ./nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /tianyi-ui/dist /usr/share/nginx/html
COPY --from=builder /tianyi-ui/dist /etc/nginx/html
ADD ./start.sh /tianyi-ui

EXPOSE 7070

CMD ["sh", "start.sh"]
