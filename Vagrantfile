# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure(2) do |config|

  config.vm.box = "ubuntu/trusty64"

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  config.vm.network "forwarded_port", guest: 80, host: 5000

  # Enable provisioning with a shell script. Additional provisioners such as
  # Puppet, Chef, Ansible, Salt, and Docker are also available. Please see the
  # documentation for more information about their specific syntax and use.
  config.vm.provision "shell", inline: <<-SHELL
    apt-get update
    apt-get install -y nginx
    if [ -f /etc/nginx/sites-enabled/default ]; then
      rm /etc/nginx/sites-enabled/default
      rm /etc/nginx/sites-available/default
    fi
    cp /vagrant/config/staff.khe.conf /etc/nginx/sites-available
    ln -s /etc/nginx/sites-available/staff.khe.conf /etc/nginx/sites-enabled
    service nginx reload
    echo "---------------------------------------------"
    echo "| See application at http://localhost:5000/ |"
    echo "---------------------------------------------"
  SHELL
end
