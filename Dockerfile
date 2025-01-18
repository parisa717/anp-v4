FROM node:23.1.0

ARG GITLAB_CA
ENV GITLAB_CA=${GITLAB_CA}
ARG CI_JOB_TOKEN
ENV CI_JOB_TOKEN=${CI_JOB_TOKEN}
ARG APP_NAME
ENV APP_NAME=${APP_NAME}
ARG VITE_API_ENDPOINT
ENV VITE_API_ENDPOINT=${VITE_API_ENDPOINT}

ARG LE_STAG_ROOT_CA
ENV LE_STAG_ROOT_CA=${LE_STAG_ROOT_CA}


RUN mkdir -p /usr/local/share/ca-certificates \
    && echo "${LE_STAG_ROOT_CA}" > /usr/local/share/ca-certificates/le-stag-ca.crt \
    && echo "${GITLAB_CA}" > /usr/local/share/ca-certificates/gitlab-ca.crt \
    && update-ca-certificates
ENV NODE_EXTRA_CA_CERTS=/usr/local/share/ca-certificates/gitlab-ca.crt

WORKDIR /app
COPY . .

RUN echo ${CI_JOB_TOKEN}
RUN echo "192.168.49.8 gitlab.avag.eu" >> /etc/hosts \
    && echo "@nexus:registry=https://gitlab.avag.eu/api/v4/projects/60/packages/npm/" > .npmrc \
    && echo "//gitlab.avag.eu/api/v4/projects/60/packages/npm/:_authToken=${CI_ACCESS_TOKEN}" >> .npmrc \

RUN cat .npmrc
RUN npm config set strict-ssl false && \
    npm install && npx nx build ${APP_NAME}

EXPOSE 80
ENTRYPOINT ["sh", "-c", "npx nx run ${APP_NAME}:start"]