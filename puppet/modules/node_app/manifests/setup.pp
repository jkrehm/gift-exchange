class node_app::setup {
    $default_packages = [
        'g++',
    ]

    package { $default_packages:
        ensure => present,
    }
}