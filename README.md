# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

  groups_usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

  Association
- belongs_to :group
- belongs_to :user

  usersテーブル

|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|nickname|string|null: false|

  Association
- has_many :groups, through: :groups_users
- has_many :comments
- has_many :groups_users


  groupsテーブル

|Column|Type|Options|
|------|----|-------|
|text|text|null: false|
|user_id|integer|null: false, foreign_key: true|
|groups_users_id|integer|null: false, foreign_key: true|

  Association
- has_many :comments
- belongs_to :user
- belongs_to :groups_users

  commentsテーブル

|Column|Type|Options|
|------|----|-------|
|text|text||
|image|text||
|user_id|integer|null: false, foreign_key: true|
|groups_id|integer|null: false, foreign_key: true|

  Association
- belongs_to :groups
- belongs_to :user