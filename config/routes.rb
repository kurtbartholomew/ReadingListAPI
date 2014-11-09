ReadingList::Application.routes.draw do
  resources :books, except: [:update] 
  resources :genres
  resources :finished_books

  root 'home#show'

end
