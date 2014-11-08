ReadingList::Application.routes.draw do
  resources :books, except: [:destroy, :update] 
end
