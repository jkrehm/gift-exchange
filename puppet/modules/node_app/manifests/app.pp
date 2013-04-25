class node_app::app {

    class { 'nodejs':
        version => $params::node_version,
    }

    # Uses NPM provider from PuppetLabs Node.js project.
    # https://github.com/puppetlabs/puppetlabs-nodejs
    package { 'forever':
        ensure => installed,
        provider => 'npm',
        require => Class['nodejs'],
    }
}