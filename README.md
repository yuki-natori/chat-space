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

  userテーブル

|Column|Type|Options|
|------|----|-------|
|email|string|null: false, foreign_key: true|
|password|string|null: false, foreign_key: true|
|nickname|string|null: false, foreign_key: true|

  Association
- belongs_to :group
- belongs_to :comments
- belongs_to :groups_users

  groupテーブル

|Column|Type|Options|
|------|----|-------|
|text|text|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
|group_ures_id|integer|null: false, foreign_key: true|

  Association
- belongs_to :comment
- belongs_to :user

  commentテーブル

|Column|Type|Options|
|------|----|-------|
|text|text|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

  Association
- belongs_to :group
- belongs_to :user