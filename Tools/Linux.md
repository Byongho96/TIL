# Linux

# 1. systemctl

## 1.1 .service

Starting a service: sudo systemctl start <service-name>
Stopping a service: sudo systemctl stop <service-name>
Restarting a service: sudo systemctl restart <service-name>
Enabling a service to start at boot: sudo systemctl enable <service-name>
Disabling a service from starting at boot: sudo systemctl disable <service-name>
Viewing the status of a service: sudo systemctl status <service-name>
Viewing the logs of a service: sudo journalctl -u <service-name>

## 2. ln
