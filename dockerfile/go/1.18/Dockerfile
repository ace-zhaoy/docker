FROM golang:1.18 as builder

WORKDIR /app

ONBUILD COPY . .

RUN go mod tidy && CGO_ENABLED=0 GOOS=linux go build -o app .

FROM alpine:latest

WORKDIR /app

COPY --from=builder /app/app .

CMD ["./app"]