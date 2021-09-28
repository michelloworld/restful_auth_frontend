for ext_host in "api.localhost.dev"
do
  HOST_IP=`/sbin/ip route|awk '/default/ { print $3 }'`
  echo "${HOST_IP} ${ext_host}" | tee -a /etc/hosts
done

exec npm run dev