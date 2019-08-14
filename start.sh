echo net.ipv6.conf.all.disable_ipv6 = 1 >> /etc/sysctl.conf
echo net.ipv6.conf.default.disable_ipv6 = 1 >> /etc/sysctl.conf
echo net.ipv6.conf.lo.disable_ipv6 = 1 >> /etc/sysctl.conf
echo net.ipv6.conf.eth0.disable_ipv6 = 1 >> /etc/sysctl.conf
sync
echo 3 > /proc/sys/vm/drop_caches
nginx -g "daemon off;"
