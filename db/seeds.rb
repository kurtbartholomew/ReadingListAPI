# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
Book.destroy_all

Book.create!(title: 'Pragmatic Programmer', rating: 5)
Book.create!(title: "Ender's Game", rating: 4)

p "Created #{Book.count} books"