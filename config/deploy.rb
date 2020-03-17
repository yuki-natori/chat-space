# config valid only for current version of Capistrano
# capistranoのバージョンを記載。固定のバージョンを利用し続け、バージョン変更によるトラブルを防止する
lock '3.12.1'

# Capistranoのログの表示に利用する
set :application, 'chat-space'

# どのリポジトリからアプリをpullするかを指定する
set :repo_url,  'git@github.com:yuki-natori/chat-space.git'

# バージョンが変わっても共通で参照するディレクトリを指定
set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'public/system', 'public/uploads')

set :rbenv_type, :user
set :rbenv_ruby, '2.5.1' #カリキュラム通りに進めた場合、2.5.1か2.3.1です

# どの公開鍵を利用してデプロイするか
set :ssh_options, auth_methods: ['publickey'],
                  keys: ['AAAAB3NzaC1yc2EAAAADAQABAAACAQCzpUSd2SokBj8jl9GpsE+lcT9g65Au8UJZMnoUQf4TLsAq5W8LzXpnRjm/ayhPcjLdr2y6oDJIYZZYAPAY3O6ug7i/oqNOMQJK+Ihz/l+lVQY8VCx+U2LJxsVYpFrpceHWDXtXCDI1esywjU5cCkbA8OdPWbnWC/Q1x29zbJbX5Bx/zUkcJiVVvF9fHEMXmbVsODgkRjSAbPJp1IXX2tKt6FD87kMyWt+syVDHyEKJw2lSXQ0JvqE0cUEGMN59c/7FxJdDCaM3sOE4p5XPMKBFYQJcUQmsbmqNgiRvil1OcC7hKpC/1PMkL6hi3xs4zgv5YeYPojvOkUlYFzrOcTc0hwSgLN5c9XCnJ5Mv/wHyVeUCnE2FymUP1Mxqzz/cBqBoYPz25R6NP83sbWmAc3YSLp2D8FDDMiM7O4ItsFW309xwDXKBGWu0FY3GoH1FOWAD72Zq2e7NDyWQ9Kw7uMSXUIGR4/zyt49DZfOQlr5hiVzBCYGXtQ0P31xGci9emXCpSEhpysrCsWy8H8lqQAgkqBXM+mtOUsCdAFWZVjU0gXG916SFvS2CYTbvMQg++wp6ADosn/pqfNWtfNVeUTqXGeyND8W6iBHrWVM60Up2DObJ9ByqYel7ylcecBgG0tigjFemOlMJNdnoriQ0sK3mXiFPGd8gOyRENWjwzpb3Gw'] 

# プロセス番号を記載したファイルの場所
set :unicorn_pid, -> { "#{shared_path}/tmp/pids/unicorn.pid" }

# Unicornの設定ファイルの場所
set :unicorn_config_path, -> { "#{current_path}/config/unicorn.rb" }
set :keep_releases, 5

# デプロイ処理が終わった後、Unicornを再起動するための記述
after 'deploy:publishing', 'deploy:restart'
namespace :deploy do
  task :restart do
    invoke 'unicorn:restart'
  end
end