docker run -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
docker run -p 9090:9090 -p 9191:9191 -e initialBuckets=UPLOAD_BUCKET -t adobe/s3mock