#!/bin/sh

if [ "$(id -u)" != "0" ]; then
  echo "Sorry, you are not root."
  exit 1
fi

#check for Distro
distro=$(cat /etc/*release)
if [[ ! "$distro" =~ "Amazon Linux AMI" ]]; then
    yum -y install pcp pcp-webapi
    service pcp start
    service pmwebd start
else
    if !(type pcp 2>/dev/null); then
        yum -y install git bison flex gcc-c++ perl-Tk-devel libmicrohttpd-devel
        git clone git://git.pcp.io/pcp
        yum-builddep -y pcp
        cd pcp
        ./configure --prefix=/usr/local --sysconfdir=/etc --localstatedir=/var --with-webapi
        make
        groupadd -r pcp
        useradd -c "Performance Co-Pilot" -g pcp -d /var/lib/pcp -M -r -s /usr/sbin/nologin pcp
        make install
        ldconfig -v
    fi
    service pcp restart
    service pmwebd restart
    service pmlogger restart
fi