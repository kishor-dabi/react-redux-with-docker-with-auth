# syntax=docker/dockerfile:1

# # Comments are provided throughout this file to help you get started.
# # If you need more help, visit the Dockerfile reference guide at
# # https://docs.docker.com/engine/reference/builder/

# ################################################################################
# # Pick a base image to serve as the foundation for the other build stages in
# # this file.
# #
# # For illustrative purposes, the following FROM command
# # is using the alpine image (see https://hub.docker.com/_/alpine).
# # By specifying the "latest" tag, it will also use whatever happens to be the
# # most recent version of that image when you build your Dockerfile.
# # If reproducability is important, consider using a versioned tag
# # (e.g., alpine:3.17.2) or SHA (e.g., alpine:sha256:c41ab5c992deb4fe7e5da09f67a8804a46bd0592bfdf0b1847dde0e0889d2bff).
# FROM alpine:latest as base

# ################################################################################
# # Create a stage for building/compiling the application.
# #
# # The following commands will leverage the "base" stage above to generate
# # a "hello world" script and make it executable, but for a real application, you
# # would issue a RUN command for your application's build process to generate the
# # executable. For language-specific examples, take a look at the Dockerfiles in
# # the Awesome Compose repository: https://github.com/docker/awesome-compose
# FROM base as build
# COPY <<EOF /bin/hello.sh
# #!/bin/sh
# echo Hello world from $(whoami)! In order to get your application running in a container, take a look at the comments in the Dockerfile to get started.
# EOF
# RUN chmod +x /bin/hello.sh

# ################################################################################
# # Create a final stage for running your application.
# #
# # The following commands copy the output from the "build" stage above and tell
# # the container runtime to execute it when the image is run. Ideally this stage
# # contains the minimal runtime dependencies for the application as to produce
# # the smallest image possible. This often means using a different and smaller
# # image than the one used for building the application, but for illustrative
# # purposes the "base" image is used here.
# FROM base AS final

# # What the container should run when it is started.
# ENTRYPOINT [ "/bin/hello.sh" ]

# # Create a non-priveldged user that the app will run under.
# # See https://docs.docker.com/develop/develop-images/dockerfile_best-practices/#user
# ARG UID=10001
# RUN adduser \
#     --disabled-password \
#     --gecos "" \
#     --home "/nonexistent" \
#     --shell "/sbin/nologin" \
#     --no-create-home \
#     --uid "${UID}" \
#     appuser
# USER appuser

# # Copy the executable from the "build" stage.
# COPY --from=build --chown=appuser:appuser /bin/hello.sh /bin/

# Multi-stage
# 1) Node image for building frontend assets
# 2) nginx stage to serve frontend assets

# Name the node stage "builder"
FROM node:latest as builder
RUN echo "base"
WORKDIR /app
COPY package.json ./
# COPY package-lock.json ./
COPY . .
# CMD ["npm", "run", "build"]

RUN npm i -f
# CMD ["npm", "run", "start"]


# Build the project and copy the files
RUN npm run build
CMD ["npm", "run", "build"]



# nginx state for serving content

FROM nginx:latest
RUN echo "nginx"

#!/bin/sh
COPY nginx.conf /etc/nginx/nginx.conf
## Remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/build /usr/share/nginx/html


EXPOSE 3000 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
