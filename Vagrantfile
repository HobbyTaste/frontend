# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/xenial64"
  config.vm.box_url = "Vagrantfile"
  config.vm.network "forwarded_port", guest: 8100, host: 8100

  config.vm.synced_folder "./", "/srv/website", type: "rsync", rsync__auto: true, rsync__exclude: ['node_modules/']

  config.vm.provision "install", type: "shell", inline: <<-SHELL
    apt-get update

    apt-get install -y curl
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
    curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -

    apt-get update
    apt-get install -y yarn
    apt-get install -y nodejs
    
    cd /srv/website
    yarn
  SHELL

  config.vm.provision "run", type: "shell", inline: <<-SHELL  
    cd /srv/website
    yarn build
    yarn start
  SHELL
end
