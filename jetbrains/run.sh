docker run --name teamcity-data \
  -v /var/lib/teamcity -v /var/lib/postgresql/data \
  busybox /bin/false

docker run --name teamcity-db -d \
  -e POSTGRES_USER=teamcity -e POSTGRES_PASSWORD=somepass \
  --volumes-from teamcity-data postgres

docker run -d --name teamcity --volumes-from teamcity-data \
  --link teamcity-db:teamcity-db -p 8111:8111 lsdriscoll/docker-teamcity
