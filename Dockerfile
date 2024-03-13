FROM denoland/deno:1.41.2

ARG GIT_REVISION
ENV DENO_DEPLOYMENT_ID=${GIT_REVISION}

# The port that your application listens to.
EXPOSE 8000

WORKDIR /app

ADD . .
RUN chown -R deno:deno /app

RUN mkdir -p /home/deno/.cache/deno
RUN chown -R deno:deno /home/deno

# Prefer not to run as root.
USER deno

# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno run -A dev.ts build

# Cache the dependencies
RUN deno cache main.ts

CMD ["run", "--allow-read", "--allow-env", "--allow-net", "main.ts"]