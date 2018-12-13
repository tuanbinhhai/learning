Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'application#index'
  # Users routes
  post '/signup', to: 'users#create'
  post '/signin', to: 'authentokens#create'
  post '/signout', to: 'authentokens#destroy'

  # Cars routes
  get '/cars/brands', to: 'cars#brand'
  get 'cars/models/:brand', to: 'cars#model'
  get 'cars/years/:brand/:model', to: 'cars#year'
  get '/filter', to: 'cars#filter'

end
