ReadingList::Application.routes.draw do
  resources :books, except: [:destroy, :update] 
  resources :genres
  resources :finished_books
end
