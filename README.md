# k53-backend

# EC2 instance server setup script

Launch new AWS EC2 instance and add the following script in the User Data text box

```bash
#!/bin/bash

yum update -y && yum install git httpd -y && systemctl enable --now httpd
```

# Install MariaDB

ssh into the EC2 instance and install MariaDB

```bash
ssh -i key-value-pair.pem ec2-user@ip-address
```

```bash
sudo yum install -y mariadb-server && sudo systemctl enable --now mariadb
sudo mysql_secure_installation
```

```sql
CREATE USER 'admin'@'127.0.0.1' IDENTIFIED BY 'admin@F32';

GRANT SELECT, SHOW VIEW ON k53_questions.* TO 'admin'@'127.0.0.1' IDENTIFIED BY 'admin@F32';

flush privileges;

create database k53_questions;
```

# Install NodeJS

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
nvm install node
```

# Clone the repo

```bash
git clone https://github.com/julekgwa/k53-backend.git

```

import data into our database

```bash
cd k53-backend && mysql -u root -p k53_questions < sql/db.sql
```


# Configure apache reverse proxy
Open httpd.conf
```bash
sudo vi /etc/httpd/conf/httpd.conf
```
add the following to httpd conf file

```bash
ProxyRequests Off
<Proxy *>
    Require all granted
</Proxy>

ProxyPass / http://127.0.0.1:8080/
ProxyPassReverse / http://127.0.0.1:8080/
```
