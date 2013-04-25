class setup {
    $default_packages = [
        'vim', 'git',
    ]

    package { $default_packages:
        ensure => present,
    }
}