class GenreSerializer < ActiveModel::GenreSerializer
	attributes :id, :name

	embed :ids
	has_many :books
end