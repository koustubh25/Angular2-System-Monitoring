#!/bin/sh

yum -y install git
git clone bento
yum -y install php56 httpd24

